---
layout:     post
title:      "ENTRYPOINT and CMD"
permalink: "7"
subtitle:   
date:       2024-02-29
image: "assets/img/7/main.png"
published: true
tags: [docker]
code: https://github.com/itsakettle/blog-content/tree/main/7-docker_entrypoint_and_cmd
image_width: 60%
---

When a docker container kicks off the `ENTRYPOINT` instruction is run, and the commands/arguments from the `CMD` instruction are passed to it as arguments.

## Executable Pattern
When you want the docker container to act like an executable you can use `CMD` to pass _arguments_ to the `ENTRYPOINT`. Below is an example that will fetch data from the Irish Single Electricty Market website. 

Here's the dockerfile called `entrypoint_cmd.docker`. Note that there is no `CMD` instruction because it will be specified when we run the container.

{% highlight python %}
FROM python:3.11.8-bullseye

WORKDIR /usr/src/app
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./main.py  .

ENTRYPOINT ["python", "main.py"]
{% endhighlight %}

And here is `main.py`.


{% highlight python %}
import requests
import sys
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta

SEMO_MINIMAL_COST_URL = "https://reports.sem-o.com/documents/PUB_30MinImbalCost_{period}.xml"
SEMO_PERIOD_FORMAT = "%Y%m%d%H%M"

def fetch_semo_xml(period: str):
    """
    Fetch semo data for a period. This won't be tested.

    Args:
    - period (str): The start time of the period to fetch .

    Returns:
     XML as a string or None if there is an error

    """
    semo_url = SEMO_MINIMAL_COST_URL.format(period=period)
    response = requests.get(semo_url)

    if response.status_code != 200:
        raise Exception(f"Semo data unavailable for period: {period}")

    return response.text

def parse_semo_xml(period: str, semo_xml: str):
    """
    Fetch semo data for a period.

    Args:
    - semo_xml (str): The xml to parse.

    Returns:
     A dictionary of attributes from the xml or None if there is an error parsing the xml.

    """
    try:
        xml_root = ET.fromstring(semo_xml)
        imbalance_xml = xml_root.find("PUB_30MinImbalCost")
        xml_as_dict =  {"period": period,
                        "imbalance_volume": float(imbalance_xml.attrib.get('ImbalanceVolume')),
                        "imbalance_price": float(imbalance_xml.attrib.get('ImbalancePrice')),
                        "imbalance_cost": float(imbalance_xml.attrib.get('ImbalanceCost'))}
    except:
        raise Exception(f"Unable to parse Semo xml.")
    
    return xml_as_dict

def main():

    if len(sys.argv)<2:
        current_time = datetime.now()
        new_time = current_time - timedelta(hours=2)
        period = new_time.strftime('%Y%m%d%H') + "00"
    else:
        period = sys.argv[1]
    
    semo_xml = fetch_semo_xml(period=period)
    semo_xml_as_dict = parse_semo_xml(period=period, semo_xml=semo_xml)
    print(semo_xml_as_dict)

if __name__ == "__main__":
    main()
{% endhighlight %}

First build the image using `docker build -t semo_image -f "./entrypoint_cmd.docker" .`. Then run the container to get data from a specific half hour with `docker run -t --rm semo_image "202402241030"`. Any additional arguments provided overwrite the `CMD` instruction in the Dockerfile (if there are any), so in this case `"202402241030"` is passed to the `ENTRYPOINT` script. Here's the output:

```
{'period': '202402241030', 'imbalance_volume': -2.923, 'imbalance_price': 101.15, 'imbalance_cost': -295.66145}
```
If no CMD argument is specified, i.e. `docker run -t --rm semo_image`, then this little example is setup to get the data from 2 hours ago.


## Setup Pattern

Another typical pattern seems to be using the ENTRYPOINT script to carry out setup that is required before the CMD commands are run. For an example see [this mysql Dockerfile](https://github.com/docker-library/mysql/blob/ffa6423ca24168e4d96631b5e8f536ac826d2a5b/8.0/Dockerfile.debian) where the ENTRYPOINT does lots of setup and then [the last command](https://github.com/docker-library/mysql/blob/ffa6423ca24168e4d96631b5e8f536ac826d2a5b/8.0/docker-entrypoint.sh#L410) is `exec "$@"` which will exec the `CMD` arguments that are passed to the `ENTRYPOINT`.

## Documented
Unsurprisingly this is all [very well documented](https://docs.docker.com/reference/dockerfile/) but great to put together a little example nonetheless.

_____
