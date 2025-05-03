from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer('all-MiniLM-L6-v2')

def calculate_match_score(resume_text, jd_text):
    resume_emb = model.encode(resume_text, convert_to_tensor=True)
    jd_emb = model.encode(jd_text, convert_to_tensor=True)
    score = util.cos_sim(resume_emb, jd_emb).item()

    resume_words = set(resume_text.lower().split())
    jd_words = set(jd_text.lower().split())

    matched = list(resume_words & jd_words)
    missing = list(jd_words - resume_words)

    return {
        'score': round(score * 100, 2),
        'matched': matched[:15],  # limit to show clean output
        'missing': missing[:15]
    }
