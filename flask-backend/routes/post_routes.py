# EXT IMPORTS
from flask import jsonify, request, session

# AUTHORED IMPORTS
from flask_app import app
from flask_database import db, login_required, USER, POST

@app.route('/api/get-posts', methods=['GET'])
def get_posts():
    app.logger.info('Someone got the post list!')
    return jsonify([{"id":_post.post_id, "title":_post.title, "content":_post.content }
                        for _post in db.session.query(POST).order_by(POST.post_id.desc()).all()])

@app.route('/api/make-post', methods=['POST'])
@login_required()
def make_post():
    app.logger.info('Someone is trying to make a post!')
    db.session.add(POST(user_id=session['user_id'], title=request.json['title'], content=request.json['content']))
    db.session.commit()
    return jsonify({"message":"Successfully created post!"})