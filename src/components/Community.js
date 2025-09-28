import React, { useState } from 'react';
import './Community.css';

const Community = () => {
  const [showComments, setShowComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: 'Nguyễn Thị Hoa',
        avatar: '👩‍🍳',
        verified: true
      },
      images: [
        'https://tarasmulticulturaltable.com/wp-content/uploads/2013/06/Pho-Bo-Vietnamese-Beef-Noodle-Soup-2-of-3.jpg',
        'https://vickypham.com/wp-content/uploads/2024/08/48f43-2023_06_09eosm506018.jpg',
        'https://i.ytimg.com/vi/EpRBxau3ou0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDAAng9KhsIdSBRf06WkyMDn4708w'
      ],
      caption: 'Hôm nay làm món Phở Bò theo công thức FreshKit! 🍜 Nước dùng ngọt thanh, thịt bò mềm, rau thơm tươi. Cả nhà đều khen ngon! #FreshKit #PhoBo #CookingAtHome',
      likes: 1247,
      comments: 89,
      timeAgo: '2 giờ trước',
      liked: false,
      commentsList: [
        {
          id: 1,
          user: 'Lê Thị Lan',
          avatar: '👩‍🍳',
          text: 'Nhìn ngon quá! Công thức này ở đâu vậy chị?',
          timeAgo: '1 giờ trước',
          likes: 12
        },
        {
          id: 2,
          user: 'Phạm Đức Anh',
          avatar: '👨‍🍳',
          text: 'Tôi cũng đã thử làm theo FreshKit, rất dễ làm! 👍',
          timeAgo: '45 phút trước',
          likes: 8
        },
        {
          id: 3,
          user: 'Nguyễn Thị Hoa',
          avatar: '👩‍🍳',
          text: '@Lê Thị Lan Công thức có trên app FreshKit nhé!',
          timeAgo: '30 phút trước',
          likes: 5
        }
      ]
    },
    {
      id: 2,
      user: {
        name: 'Trần Văn Minh',
        avatar: '👨‍🍳',
        verified: false
      },
      images: [
        'https://www.andy-cooks.com/cdn/shop/articles/20250617054400-andy-20cooks-20-20pork-20veg-20and-20noodles-20recipe.jpg?v=1751674201&width=1600'
      ],
      caption: 'Lần đầu thử món Bún Chả theo hướng dẫn FreshKit! Thịt nướng thơm lừng, nước chấm chua ngọt vừa miệng. Cảm ơn FreshKit đã chia sẻ công thức tuyệt vời! 🔥',
      likes: 892,
      comments: 45,
      timeAgo: '5 giờ trước',
      liked: true,
      commentsList: [
        {
          id: 1,
          user: 'Võ Thị Lan',
          avatar: '👩‍🍳',
          text: 'Bún chả ngon lắm! Tôi cũng thích món này',
          timeAgo: '3 giờ trước',
          likes: 15
        },
        {
          id: 2,
          user: 'Nguyễn Văn Hùng',
          avatar: '👨‍🍳',
          text: 'Công thức FreshKit luôn đáng tin cậy!',
          timeAgo: '2 giờ trước',
          likes: 7
        }
      ]
    },
    {
      id: 3,
      user: {
        name: 'Lê Thị Hương',
        avatar: '👩‍🍳',
        verified: true
      },
      images: [
       'https://i.ytimg.com/vi/cJu6tFJe_Gc/maxresdefault.jpg',
        'https://i.ytimg.com/vi/OVb5uoDWspM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBr9PBrWzDnhtJnXSXQB9hcHw6mnQ'
      ],
      caption: 'Cơm tấm sườn nướng - món ăn đặc sản miền Nam! Sườn nướng thơm, cơm tấm dẻo, chả trứng mềm. FreshKit giúp mình nấu ngon như nhà hàng! 🍚✨',
      likes: 2156,
      comments: 156,
      timeAgo: '1 ngày trước',
      liked: false
    },
    {
      id: 4,
      user: {
        name: 'Phạm Đức Anh',
        avatar: '👨‍🍳',
        verified: false
      },
      images: [
        'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2024_2_19_638439762164888519_cach-lam-banh-mi-pate-trung-7.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiC1rUnGZYsuPYf9WO6xSTSMSDuGfiuZn8Lcf8aXr3rb-c8nA9Hj8g7_jiF67eZpYPCIA&usqp=CAU',
        'https://blog.dktcdn.net/files/cach-lam-banh-mi-pate-xuc-xich-ngon-de-ban.jpg'
      ],
      caption: 'Bánh mì pate - bữa sáng hoàn hảo! Pate tự làm thơm ngon, rau củ tươi giòn. FreshKit đã thay đổi cách mình nấu ăn! 🥖',
      likes: 634,
      comments: 23,
      timeAgo: '2 ngày trước',
      liked: true
    },
    {
      id: 5,
      user: {
        name: 'Võ Thị Lan',
        avatar: '👩‍🍳',
        verified: true
      },
      images: [
       'https://www.btaskee.com/wp-content/uploads/2023/09/cach-nau-che-dau-do-truyen-thong.jpg'
      ],
      caption: 'Chè đậu đỏ - món tráng miệng truyền thống! Đậu đỏ mềm ngọt, nước cốt dừa thơm béo. Cả nhà đều thích! 🍮 #CheDoDo #Dessert #FreshKit',
      likes: 1789,
      comments: 98,
      timeAgo: '3 ngày trước',
      liked: false
    }
  ]);

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
      <div className="container">
        <div className="community-header">
          <h1>Cộng đồng FreshKit</h1>
          <p>Chia sẻ niềm vui nấu ăn cùng cộng đồng</p>
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
