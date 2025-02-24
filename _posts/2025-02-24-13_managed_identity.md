---
layout:     post
title:      "Managed Identities, Assume Role and OpenID Connect"
permalink: "13"
subtitle:   
date:       2025-02-24
image: "assets/img/13/managed_identity.png"
published: true
tags: [security]
code: 
image_width: 70%
---
 
In a cloud environment it’s important to avoid managing credentials yourself. After all if the cloud provider knows which services are yours, because they are in the same account/subscriptions, then the cloud provider should be able to handle authentication. 

### Managed Identities

Azure has managed identities where an instance of a service can be given access to another service almost like it’s a user. Azure handles credentials in the background. For example, you can give an Azure Function App access to a storage account based on a managed identity. 

### Assume Role
AWS has the concept of a user or a service assuming a particular role and being given temporary credentials. In the case of a service AWS handles the credentials in the background. For example we can create a role that gives access to an S3 bucket, specify that only lambda functions can assume this role, and then assign the role to a specific lambda function. When the lambda function runs it gets temporary credentials to access the S3 bucket. The user doesn’t need to manage credentials. 

AWS has  other service specific temporary credential mechanisms however Assume Role is the most generic. 

### OpenID Connect 
Cloud providers obviously have a mechanism to manage credentials in the background. We can think of OpenID Connect as such a mechanism for cross provider identities. A good example is using a GitHub action to deploy code to AWS. The action needs some temporary permissions. The essence is that a role is configured in AWS that can be assumed by a GitHub action from a specific GitHub repo. When the repo tries to connect to AWS it provides a token which AWS can verify with GitHub. AWS then provides temporary credentials giving the GitHub Action the permissions attached to the role. This avoids storing long lived credentials in GitHub. 
