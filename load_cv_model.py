import pickle
from joblib import load
vectorizer = pickle.load(open(("models/cv_2020_08_17.pkl"), "rb"))
m = load('models/model_bow_2020_08_17.joblib')


