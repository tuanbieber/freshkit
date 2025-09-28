import React, { useState } from 'react';
import './Community.css';

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: 'Nguyễn Thị Hoa',
        avatar: '👩‍🍳',
        verified: true
      },
      images: [
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500',
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500',
        'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500'
      ],
      caption: 'Hôm nay làm món Phở Bò theo công thức FreshKit! 🍜 Nước dùng ngọt thanh, thịt bò mềm, rau thơm tươi. Cả nhà đều khen ngon! #FreshKit #PhoBo #CookingAtHome',
      likes: 1247,
      comments: 89,
      timeAgo: '2 giờ trước',
      liked: false
    },
    {
      id: 2,
      user: {
        name: 'Trần Văn Minh',
        avatar: '👨‍🍳',
        verified: false
      },
      images: [
        'https://images.unsplash.com/photo-1563379091339-03246963d4d0?w=500',
        'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=500'
      ],
      caption: 'Lần đầu thử món Bún Chả theo hướng dẫn FreshKit! Thịt nướng thơm lừng, nước chấm chua ngọt vừa miệng. Cảm ơn FreshKit đã chia sẻ công thức tuyệt vời! 🔥',
      likes: 892,
      comments: 45,
      timeAgo: '5 giờ trước',
      liked: true
    },
    {
      id: 3,
      user: {
        name: 'Lê Thị Hương',
        avatar: '👩‍🍳',
        verified: true
      },
      images: [
        'https://images.unsplash.com/photo-1565299585323-38174c4a4a0a?w=500',
        'https://images.unsplash.com/photo-1563379091339-03246963d4d0?w=500',
        'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500'
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
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500'
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
        'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500'
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
                  <button className="view-comments">
                    Xem tất cả {post.comments} bình luận
                  </button>
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
