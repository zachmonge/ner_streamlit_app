# Named Entity Streamlit App

This is a simple named entity recognition app. It uses a custom model that is far from state-of-the-art. It simply uses a linear logistic regression and was trained with a bag-of-words representation. This app is simply to practice creating a web app and wrap it in a Docker image.

To run this model on your local computer, first, you need to have Docker installed. Next, clone this directory. Then, go to the directory and run the following command:

```docker build -f Dockerfile -t ner_app:latest .```

This will build the Docker image. Then, to run the container, run the following command:

```docker run -p 8501:8501 ner_app:latest```

The app will now be available at http://localhost:8501/

This is the landing page of the app. As you can see, it is not completely polished at this point (there are tokens indicatings that the first letter of each word is capitalized)

![](/images/image1.PNG)
