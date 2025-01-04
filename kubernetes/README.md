# Instruction to deploying the backend on Kubernetes
This document provides instructions on how to deploy the backend on Kubernetes.
First of all, you need to have a Kubernetes cluster running. If you don't have one, you can use [Minikube](https://minikube.sigs.k8s.io/docs/start/).
Next, you need to have `kubectl` installed. You can install it by following the instructions [here](https://kubernetes.io/docs/tasks/tools/install-kubectl/).
After you have `kubectl` installed, you can deploy the backend by running the following command:
```bash
kubectl apply -f ./mongo-storage.yaml
kubectl apply -f ./postgres-storage.yaml
kubectl apply -f ./
```
After that, to access the backend, you need to port-forward the service to your local machine. You can do that by running the following command:
```bash
minikube service mindglow-web-bff-server-service --url
```
This will give you a URL that you can use to access the backend.