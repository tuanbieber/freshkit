import React, { useState, useEffect } from 'react';
import storageService from '../services/storage';
import './Community.css';

const Community = () => {
  const [showComments, setShowComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [posts, setPosts] = useState([]);
  const [currentUser] = useState(storageService.getCurrentUser());

  useEffect(() => {
    // Load posts from storage
    const storedPosts = storageService.getPosts();
    setPosts(storedPosts);
  }, []);

  const [currentImageIndex, setCurrentImageIndex] = useState({});

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked, 
            likes: post.liked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const toggleComments = (postId) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleAddComment = (postId) => {
    const commentText = newComment[postId];
    if (!commentText || commentText.trim() === '') return;

    const newCommentObj = {
      id: Date.now(),
      user: 'Bạn',
      avatar: '👤',
      text: commentText,
      timeAgo: 'Vừa xong',
      likes: 0
    };

    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            commentsList: [...(post.commentsList || []), newCommentObj],
            comments: (post.comments || 0) + 1
          }
        : post
    ));

    setNewComment(prev => ({
      ...prev,
      [postId]: ''
    }));
  };

  const handleCommentInput = (postId, value) => {
    setNewComment(prev => ({
      ...prev,
      [postId]: value
    }));
  };

  const nextImage = (postId, totalImages) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [postId]: ((prev[postId] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (postId, totalImages) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [postId]: prev[postId] === 0 ? totalImages - 1 : (prev[postId] || 0) - 1
    }));
  };

  return (
    <div className="community-page">
      <div className="community-banner">
        <img src="community/banner.jpg" alt="Community Banner" />
      </div>
      <div className="container">
        <div className="community-header">
          <div className="community-description">
            <h2>"Khoảnh khắc bếp của bạn"</h2>
            <p>
              Bạn có muốn mọi người trầm trồ trước món ăn mình vừa thực hiện? Đây là nơi chúng ta cùng nhau khoe những "tác phẩm" đã ra lò, những khoảnh khắc vui vẻ khi vào bếp. Nơi để việc nấu ăn ngon với với PrepJoy là dễ dàng và thú vị đến mức nào!
            </p>
            <p>
              PrepJoy mong muốn thấy thành quả của bạn! Hãy chia sẻ hình ảnh món ăn đã hoàn thành, tag công thức hoặc kit thực phẩm bạn đã sử dụng. Mỗi bài đăng đều giúp những khách hàng khác có thêm động lực vào bếp và giúp chúng tôi hoàn thiện hơn sản phẩm của mình!
            </p>
          </div>
        </div>

        <div className="posts-container">
          {posts.map(post => (
            <div key={post.id} className="post-card">
              {/* Post Header */}
              <div className="post-header">
                <div className="user-info">
                  <div className="avatar">{post.user.avatar}</div>
                  <div className="user-details">
                    <div className="username">
                      {post.user.name}
                      {post.user.verified && <span className="verified">✓</span>}
                    </div>
                    <div className="post-time">{post.timeAgo}</div>
                  </div>
                </div>
                <button className="more-btn">⋯</button>
              </div>

              {/* Post Images */}
              <div className="post-images">
                <div className="image-container">
                  <img 
                    src={post.images[currentImageIndex[post.id] || 0]} 
                    alt={`Post by ${post.user.name}`}
                    className="post-image"
                  />
                  
                  {post.images.length > 1 && (
                    <>
                      <button 
                        className="nav-btn prev-btn"
                        onClick={() => prevImage(post.id, post.images.length)}
                      >
                        ‹
                      </button>
                      <button 
                        className="nav-btn next-btn"
                        onClick={() => nextImage(post.id, post.images.length)}
                      >
                        ›
                      </button>
                      <div className="image-indicators">
                        {post.images.map((_, index) => (
                          <span 
                            key={index}
                            className={`indicator ${index === (currentImageIndex[post.id] || 0) ? 'active' : ''}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Post Actions */}
              <div className="post-actions">
                <div className="action-buttons">
                  <button 
                    className={`action-btn like-btn ${post.liked ? 'liked' : ''}`}
                    onClick={() => handleLike(post.id)}
                  >
                    {post.liked ? '❤️' : '🤍'}
                  </button>
                  <button className="action-btn comment-btn">💬</button>
                  <button className="action-btn share-btn">📤</button>
                </div>
                <button className="action-btn save-btn">🔖</button>
              </div>

              {/* Post Content */}
              <div className="post-content">
                <div className="likes-count">
                  {post.likes.toLocaleString()} lượt thích
                </div>
                <div className="caption">
                  <span className="username">{post.user.name}</span>
                  <span className="caption-text">{post.caption}</span>
                </div>
                {post.comments > 0 && (
                  <button 
                    className="view-comments"
                    onClick={() => toggleComments(post.id)}
                  >
                    {showComments[post.id] ? 'Ẩn' : 'Xem tất cả'} {post.comments} bình luận
                  </button>
                )}

                {/* Comments Section */}
                {showComments[post.id] && (
                  <div className="comments-section">
                    <div className="comments-list">
                      {post.commentsList?.map(comment => (
                        <div key={comment.id} className="comment-item">
                          <div className="comment-avatar">{comment.avatar}</div>
                          <div className="comment-content">
                            <div className="comment-header">
                              <span className="comment-user">{comment.user}</span>
                              <span className="comment-time">{comment.timeAgo}</span>
                            </div>
                            <p className="comment-text">{comment.text}</p>
                            <div className="comment-actions">
                              <button className="comment-like-btn">
                                ❤️ {comment.likes}
                              </button>
                              <button className="comment-reply-btn">Trả lời</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add Comment Form */}
                    <div className="add-comment">
                      <div className="comment-input-container">
                        <input
                          type="text"
                          placeholder="Viết bình luận..."
                          value={newComment[post.id] || ''}
                          onChange={(e) => handleCommentInput(post.id, e.target.value)}
                          className="comment-input"
                          onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                        />
                        <button 
                          className="comment-submit-btn"
                          onClick={() => handleAddComment(post.id)}
                        >
                          Đăng
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
