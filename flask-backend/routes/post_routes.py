# EXT IMPORTS
from flask import jsonify, request, session

# AUTHORED IMPORTS
from flask_app import app
from flask_database import db, login_required, USER, POST

@app.route('/api/get-posts', methods=['GET'])
def get_posts():
    app.logger.info('Someone got the post list!')
    
    # Query posts and join with the USER table to fetch the username
    posts = (
        db.session.query(
            POST.post_id,
            POST.title,
            POST.content,
            POST.date_created,
            USER.username
        )
        .join(USER, POST.user_id == USER.user_id)
        .order_by(POST.post_id.desc())
        .all()
    )
    
    # Format the results
    response = [
        {
            "id": post.post_id,
            "title": post.title,
            "content": post.content,
            "date_created": post.date_created,
            "username": post.username
        }
        for post in posts
    ]
    
    return jsonify(response)


@app.route('/api/make-post', methods=['POST'])
@login_required()
def make_post():
    app.logger.info('Someone is trying to make a post!')
    db.session.add(POST(user_id=session['user_id'], title=request.json['title'], content=request.json['content']))
    db.session.commit()
    return jsonify({"message":"Successfully created post!"})