import streamlit as st
import pandas as pd 
import numpy as np
from load_css import local_css
from load_cv_model import vectorizer, m
from fastai.text import Tokenizer, SpacyTokenizer

def html_format(toks_preds_df):
    #Need HTLM formatting for the following entities
    # O, B-ORG, I-ORG, B-MISC, I-MISC, B-PER, I-PER, B-LOC, I-LOC
    html_format_list = []
    for tok, pred in zip(toks_preds_df['toks'].values, toks_preds_df['preds'].values):
        if pred=='O': html_entry = tok
        elif (pred == 'B-ORG')|(pred == 'I-ORG'): html_entry = f"<span class='highlight blue'>{tok}<span class='bold'>ORG</span> </span>"
        elif (pred == 'B-MISC')|(pred == 'I-MISC'): html_entry = f"<span class='highlight red'>{tok}<span class='bold'>MISC</span> </span>"
        elif (pred == 'B-PER')|(pred == 'I-PER'): html_entry = f"<span class='highlight green'>{tok}<span class='bold'>PER</span> </span>"
        elif (pred == 'B-LOC')|(pred == 'I-LOC'): html_entry = f"<span class='highlight purple'>{tok}<span class='bold'>LOC</span> </span>"
        html_format_list.append(html_entry)
    return html_format_list

def get_preds(user_input, vectorizer, m):
    tokenizer = Tokenizer()
    tok = SpacyTokenizer('en')
    toks = tokenizer.process_text(user_input, tok)
    term_doc = vectorizer.transform(toks)
    preds = m.predict(term_doc)
    toks_preds_df = pd.DataFrame()
    toks_preds_df['toks'] = toks
    toks_preds_df['preds'] = preds

    html_format_list = html_format(toks_preds_df)
    html_format_join = ' '.join(html_format_list)
    html_format_join = "<div>"+html_format_join+"</span></div>"
    return html_format_join

st.title('Named Entity Recognition')
user_input = st.text_area('Enter text here', 'Try Me')
html_format_list = get_preds(user_input, vectorizer, m)

local_css("style.css")
st.markdown(html_format_list, unsafe_allow_html=True)