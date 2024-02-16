---
layout:     post
title:      "Docker build, run and remove"
permalink: "6"
subtitle:   
date:       2024-02-09
image: "assets/img/6/main.png"
published: true
tags: [docker]
image_width: 60%
---

A mega simple script to build a docker image, run the container and then remove the container. This is useful when you're interating or you want to repeatrun the container like a script or binary many times.

{% highlight bash %}
#!/bin/bash
dockerfile=$1
image_name="image_${dockerfile}"
docker build -t $image_name -f "./${dockerfile}" . && docker run -t --rm $image_name
echo $?
{% endhighlight %}

* `-t` specifies an image name.

* `-f` specifies the dockerfile. This file should be in the current directory because of the `.` at the end of the build command.

* `-t` connects your terminal to the input and output streams of the container. This is useful if you want to see output as the container command runs.

* `-rm` removes the container once it has run.

* `echo $?`` prints out the result of the previous command.

If this was in an executable file called `run_dockerfile.sh` then you could do

{% highlight bash %}
./run_dockerfile.sh my_app.docker
{% endhighlight %}

Possible improvements:

* Validate the inputs.

* Handle errors.

* Use a default dockerfile name (e.g. DOCKERFILE).

* Pass extra arguments on to docker run e.g. memory allocation.

It seems you can achieve something similar with `docker-compose`. However when I tried it I had some difficulty getting stdout and stderr.

_____