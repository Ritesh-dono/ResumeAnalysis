from flask import Flask, request, jsonify
from flask_cors import CORS
import os

from parser import extract_text_from_pdf, extract_info
from matcher import calculate_match_score

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze_resume():
    resume_file = request.files.get('resume')
    jd_text = request.form.get('jd')

    if not resume_file or not jd_text:
        return jsonify({'error': 'Resume and JD are required'}), 400

    resume_text = extract_text_from_pdf(resume_file)
    info = extract_info(resume_text)
    match_result = calculate_match_score(resume_text, jd_text)

    response = {
        'name': info.get('name'),
        'email': info.get('email'),
        'phone': info.get('phone'),
        'skills': info.get('skills'),
        'match_score': match_result['score'],
        'matched_skills': match_result['matched'],
        'missing_skills': match_result['missing'],
    }
    return jsonify(response)

# Run only when not using Gunicorn or other WSGI servers
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
