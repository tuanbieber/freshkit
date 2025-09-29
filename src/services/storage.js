// Simple in-memory storage service with session persistence
class StorageService {
  constructor() {
    this.data = {
      users: [],
      currentUser: null,
      posts: [],
      comments: [],
      likes: [],
      subscriptions: []
    };
    
    // Load persisted data on initialization
    this.loadPersistedData();
    this.loadSession();
  }
  // Data Persistence Management
  loadPersistedData() {
    try {
      const usersData = localStorage.getItem('freshkit_users');
      if (usersData) {
        this.data.users = JSON.parse(usersData);
        console.log('Loaded persisted users:', this.data.users.length);
      }

      const subscriptionsData = localStorage.getItem('freshkit_subscriptions');
      if (subscriptionsData) {
        this.data.subscriptions = JSON.parse(subscriptionsData);
        console.log('Loaded persisted subscriptions:', this.data.subscriptions.length);
      }
    } catch (error) {
      console.error('Error loading persisted data:', error);
    }
  }

  savePersistedData() {
    try {
      localStorage.setItem('freshkit_users', JSON.stringify(this.data.users));
      console.log('Saved users to localStorage:', this.data.users.length);
      
      localStorage.setItem('freshkit_subscriptions', JSON.stringify(this.data.subscriptions));
      console.log('Saved subscriptions to localStorage:', this.data.subscriptions.length);
    } catch (error) {
      console.error('Error saving persisted data:', error);
    }
  }

  // Session Management
  loadSession() {
    try {
      const sessionData = localStorage.getItem('freshkit_session');
      if (sessionData) {
        const session = JSON.parse(sessionData);
        const now = new Date().getTime();
        
        // Check if session is still valid (24 hours)
        if (session.expiresAt && now < session.expiresAt) {
          this.data.currentUser = session.user;
          console.log('Session restored for user:', this.data.currentUser.name);
        } else {
          // Session expired, clear it
          console.log('Session expired, clearing...');
          this.clearSession();
        }
      }
    } catch (error) {
      console.error('Error loading session:', error);
      this.clearSession();
    }
  }

  saveSession(user) {
    try {
      const session = {
        user: user,
        expiresAt: new Date().getTime() + (24 * 60 * 60 * 1000) // 24 hours
      };
      localStorage.setItem('freshkit_session', JSON.stringify(session));
      console.log('Session saved for user:', user.name);
    } catch (error) {
      console.error('Error saving session:', error);
    }
  }

  clearSession() {
    try {
      localStorage.removeItem('freshkit_session');
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  }

  // Clear all persisted data (for testing or reset purposes)
  clearAllData() {
    try {
      localStorage.removeItem('freshkit_session');
      localStorage.removeItem('freshkit_users');
      localStorage.removeItem('freshkit_subscriptions');
      this.data.users = [];
      this.data.currentUser = null;
      this.data.subscriptions = [];
      console.log('All data cleared');
    } catch (error) {
      console.error('Error clearing all data:', error);
    }
  }

  // User Management
  login(username, password) {
    const user = this.data.users.find(u => 
      (u.username === username || u.email === username) && u.password === password
    );
    
    if (user) {
      this.data.currentUser = { ...user };
      delete this.data.currentUser.password; // Remove password from current user
      
      // Save session to localStorage
      this.saveSession(this.data.currentUser);
      
      return { success: true, user: this.data.currentUser };
    }
    
    return { success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng' };
  }

  logout() {
    this.data.currentUser = null;
    this.clearSession();
    return { success: true };
  }

  getCurrentUser() {
    return this.data.currentUser;
  }

  isLoggedIn() {
    return this.data.currentUser !== null;
  }

  // Check if session is valid and refresh if needed
  checkSession() {
    if (this.data.currentUser) {
      // Session is already loaded and valid
      return true;
    }
    
    // Try to load session from localStorage
    this.loadSession();
    return this.data.currentUser !== null;
  }

  // Refresh session expiration time
  refreshSession() {
    if (this.data.currentUser) {
      this.saveSession(this.data.currentUser);
    }
  }

  register(userData) {
    const { username, email, password, name } = userData;
    
    // Check if user already exists
    const existingUser = this.data.users.find(u => 
      u.username === username || u.email === email
    );
    
    if (existingUser) {
      return { success: false, message: 'Tên đăng nhập hoặc email đã tồn tại' };
    }
    
    const newUser = {
      id: this.data.users.length + 1,
      username,
      email,
      password,
      name,
      avatar: '👤',
      verified: false,
      joinDate: new Date().toISOString().split('T')[0]
    };
    
    this.data.users.push(newUser);
    
    // Save users to localStorage
    this.savePersistedData();
    
    return { success: true, user: newUser };
  }

  // Posts Management
  getPosts() {
    return this.data.posts;
  }

  addPost(postData) {
    const newPost = {
      id: Date.now(),
      ...postData,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      liked: false
    };
    
    this.data.posts.unshift(newPost); // Add to beginning
    return newPost;
  }

  updatePost(postId, updates) {
    const postIndex = this.data.posts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
      this.data.posts[postIndex] = { ...this.data.posts[postIndex], ...updates };
      return this.data.posts[postIndex];
    }
    return null;
  }

  deletePost(postId) {
    const postIndex = this.data.posts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
      this.data.posts.splice(postIndex, 1);
      return true;
    }
    return false;
  }

  // Comments Management
  getComments(postId) {
    return this.data.comments.filter(c => c.postId === postId);
  }

  addComment(postId, commentData) {
    const newComment = {
      id: Date.now(),
      postId,
      ...commentData,
      createdAt: new Date().toISOString(),
      likes: 0
    };
    
    this.data.comments.push(newComment);
    
    // Update post comment count
    const post = this.data.posts.find(p => p.id === postId);
    if (post) {
      post.comments = (post.comments || 0) + 1;
    }
    
    return newComment;
  }

  updateComment(commentId, updates) {
    const commentIndex = this.data.comments.findIndex(c => c.id === commentId);
    if (commentIndex !== -1) {
      this.data.comments[commentIndex] = { ...this.data.comments[commentIndex], ...updates };
      return this.data.comments[commentIndex];
    }
    return null;
  }

  deleteComment(commentId) {
    const commentIndex = this.data.comments.findIndex(c => c.id === commentId);
    if (commentIndex !== -1) {
      const comment = this.data.comments[commentIndex];
      this.data.comments.splice(commentIndex, 1);
      
      // Update post comment count
      const post = this.data.posts.find(p => p.id === comment.postId);
      if (post) {
        post.comments = Math.max(0, (post.comments || 0) - 1);
      }
      
      return true;
    }
    return false;
  }

  // Likes Management
  toggleLike(postId, userId) {
    const likeKey = `${postId}-${userId}`;
    const likeIndex = this.data.likes.findIndex(l => l.key === likeKey);
    
    if (likeIndex !== -1) {
      // Unlike
      this.data.likes.splice(likeIndex, 1);
      
      // Update post likes count
      const post = this.data.posts.find(p => p.id === postId);
      if (post) {
        post.likes = Math.max(0, (post.likes || 0) - 1);
        post.liked = false;
      }
      
      return { liked: false, likes: post?.likes || 0 };
    } else {
      // Like
      this.data.likes.push({
        key: likeKey,
        postId,
        userId,
        createdAt: new Date().toISOString()
      });
      
      // Update post likes count
      const post = this.data.posts.find(p => p.id === postId);
      if (post) {
        post.likes = (post.likes || 0) + 1;
        post.liked = true;
      }
      
      return { liked: true, likes: post?.likes || 0 };
    }
  }

  isLiked(postId, userId) {
    const likeKey = `${postId}-${userId}`;
    return this.data.likes.some(l => l.key === likeKey);
  }

  // Subscriptions Management
  getSubscriptions() {
    return this.data.subscriptions;
  }

  addSubscription(subscriptionData) {
    const newSubscription = {
      id: Date.now(),
      ...subscriptionData,
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    
    this.data.subscriptions.push(newSubscription);
    
    // Save to localStorage
    this.savePersistedData();
    
    return newSubscription;
  }

  updateSubscription(subscriptionId, updates) {
    const subIndex = this.data.subscriptions.findIndex(s => s.id === subscriptionId);
    if (subIndex !== -1) {
      this.data.subscriptions[subIndex] = { ...this.data.subscriptions[subIndex], ...updates };
      
      // Save to localStorage
      this.savePersistedData();
      
      return this.data.subscriptions[subIndex];
    }
    return null;
  }

  // Utility Methods
  getStats() {
    return {
      totalUsers: this.data.users.length,
      totalPosts: this.data.posts.length,
      totalComments: this.data.comments.length,
      totalLikes: this.data.likes.length,
      totalSubscriptions: this.data.subscriptions.length
    };
  }

  // Initialize with sample data
  initializeSampleData() {
    // Add sample posts if none exist
    if (this.data.posts.length === 0) {
      this.data.posts = [
        {
          id: 1,
          userId: 1,
          user: {
            name: 'Nguyễn Thị Hoa',
            avatar: '👩‍🍳',
            verified: true
          },
          images: [
            'https://vickypham.com/wp-content/uploads/2024/08/48f43-2023_06_09eosm506018.jpg',
            'https://i.ytimg.com/vi/EpRBxau3ou0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDAAng9KhsIdSBRf06WkyMDn4708w'
          ],
          caption: 'Hôm nay làm món Phở Bò theo công thức FreshKit! 🍜 Nước dùng ngọt thanh, thịt bò mềm, rau thơm tươi. Cả nhà đều khen ngon! #FreshKit #PhoBo #CookingAtHome',
          likes: 1247,
          comments: 89,
          timeAgo: '2 giờ trước',
          liked: false,
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 2,
          userId: 2,
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
          createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
        }
      ];
    }

    // Add sample comments
    if (this.data.comments.length === 0) {
      this.data.comments = [
        {
          id: 1,
          postId: 1,
          userId: 2,
          user: 'Lê Thị Lan',
          avatar: '👩‍🍳',
          text: 'Nhìn ngon quá! Công thức này ở đâu vậy chị?',
          timeAgo: '1 giờ trước',
          likes: 12,
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 2,
          postId: 1,
          userId: 1,
          user: 'Phạm Đức Anh',
          avatar: '👨‍🍳',
          text: 'Tôi cũng đã thử làm theo FreshKit, rất dễ làm! 👍',
          timeAgo: '45 phút trước',
          likes: 8,
          createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString()
        }
      ];
    }
  }
}

// Create singleton instance
const storageService = new StorageService();
storageService.initializeSampleData();

export default storageService;
