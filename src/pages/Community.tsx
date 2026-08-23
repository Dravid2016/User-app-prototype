import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Sparkles,
  PlusCircle,
  Trophy,
  ChefHat,
  MapPin,
  CheckCircle2,
  Send,
  Video,
  Image as ImageIcon,
  Flame,
  Award,
  Gift,
  X,
} from 'lucide-react';
import { INITIAL_COMMUNITY_POSTS, KITCHEN_LEADERBOARD, CommunityPost } from '../data/communityData';
import { useAppStore } from '../store/appStore';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import '../styles/tokens.css';

export const Community: React.FC = () => {
  const { showToast, setPage } = useAppStore();
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInputText, setCommentInputText] = useState<string>('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  // New post form state
  const [newKitchenName, setNewKitchenName] = useState<string>('Anna Nagar Home Kitchen');
  const [newChefName, setNewChefName] = useState<string>('Chef Meena S.');
  const [newCategory, setNewCategory] = useState<'Live Cooking' | 'Hygiene & Prep' | 'Special Menu Pitch' | 'Chef Story'>('Live Cooking');
  const [newCaption, setNewCaption] = useState<string>('Fresh hot ghee pods idli and sambar batch ready now! Prepared with 100% cold-pressed oil and organic millets. Order fresh!');
  const [newStatusBadge, setNewStatusBadge] = useState<string>('🔥 Fresh Batch Ready in 10 mins!');
  const [newMediaUrl, setNewMediaUrl] = useState<string>('https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80');

  // Filter posts by category
  const filteredPosts = posts.filter((post) => {
    if (selectedCategoryFilter === 'All') return true;
    return post.category === selectedCategoryFilter;
  });

  // Handle Like Post
  const handleToggleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const isNowLiked = !post.isLiked;
          const newLikes = isNowLiked ? post.likesCount + 1 : post.likesCount - 1;
          showToast(isNowLiked ? 'Liked kitchen pitch ❤️' : 'Removed like');
          return { ...post, isLiked: isNowLiked, likesCount: newLikes };
        }
        return post;
      })
    );
  };

  // Handle Share Post
  const handleSharePost = (kitchenName: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`Check out ${kitchenName} on Feazto Community!`);
    }
    showToast(`Pitch shared! Link copied for ${kitchenName}`);
  };

  // Handle Submit Comment
  const handleAddComment = (postId: string) => {
    if (!commentInputText.trim()) return;
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const updatedComments = [
            ...post.commentsList,
            {
              id: `c-${Date.now()}`,
              userName: 'You (Foodie)',
              userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
              text: commentInputText.trim(),
              timeAgo: 'Just now',
            },
          ];
          return {
            ...post,
            commentsList: updatedComments,
            commentsCount: post.commentsCount + 1,
          };
        }
        return post;
      })
    );
    setCommentInputText('');
    showToast('Comment added!');
  };

  // Handle Submit New Post Pitch
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    const createdPost: CommunityPost = {
      id: `post-${Date.now()}`,
      kitchenName: newKitchenName || 'My Feazto Kitchen',
      chefName: newChefName || 'Home Chef',
      chefAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      location: 'Anna Nagar, Chennai',
      isVerifiedChef: true,
      timestamp: 'Just now',
      category: newCategory,
      statusBadge: newStatusBadge,
      caption: newCaption,
      mediaType: 'image',
      mediaUrl: newMediaUrl,
      likesCount: 1,
      commentsCount: 0,
      sharesCount: 0,
      isLiked: true,
      ratingScore: 5.0,
      rewardTier: 'Rising Star',
      dishTags: ['Fresh Prep', 'Feazto Special'],
      commentsList: [],
    };

    setPosts([createdPost, ...posts]);
    setIsCreateModalOpen(false);
    showToast('🏆 Kitchen Pitch Published! You are in the weekly Gift Contest!');
  };

  return (
    <div className="pb-24 pt-3 px-4 animate-fade-in text-left max-w-[430px] mx-auto">
      {/* 1. Header Banner & Action Bar */}
      <div className="p-4 bg-gradient-to-r from-[#111111] via-[#222222] to-[#111111] text-white rounded-[24px] border-2 border-black mb-4 shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5 text-[#FFD21F] text-xs font-black">
              <Sparkles size={14} className="fill-[#FFD21F]" /> FEAZTO KITCHEN COMMUNITY
            </div>
            <span className="bg-[#FF3B30] text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
              LIVE PITCHES
            </span>
          </div>

          <h1 className="text-xl font-black text-white tracking-tight leading-tight mb-1">
            Home Kitchen Pitches & Live Feed
          </h1>
          <p className="text-[11px] font-medium text-white/80 leading-snug">
            Home chefs pitch real-time kitchen status, fresh batches & hygiene videos. High-rated pitches win weekly Feazto Gift Vouchers!
          </p>

          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="px-3.5 py-1.5 bg-[#FFD21F] text-[#111111] text-xs font-black rounded-full border border-black shadow-xs flex items-center gap-1.5 active:scale-95 transition-transform cursor-pointer"
            >
              <PlusCircle size={14} strokeWidth={2.5} /> Pitch Your Kitchen
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategoryFilter('Leaderboard')}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold rounded-full border border-white/20 flex items-center gap-1 cursor-pointer"
            >
              <Trophy size={13} className="text-[#FFD21F]" /> Gift Rewards
            </button>
          </div>
        </div>
      </div>

      {/* 2. Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-3">
        {['All', 'Live Cooking', 'Hygiene & Prep', 'Special Menu Pitch', 'Chef Story', 'Leaderboard'].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategoryFilter(cat)}
            className={`px-3 py-1 rounded-full text-xs font-black whitespace-nowrap transition-all border cursor-pointer ${
              selectedCategoryFilter === cat
                ? 'bg-[#111111] text-[#FFD21F] border-black shadow-xs'
                : 'bg-white text-[#555555] border-black/10 hover:border-black/30'
            }`}
          >
            {cat === 'Leaderboard' ? '🏆 Gift Leaderboard' : cat}
          </button>
        ))}
      </div>

      {/* 3. GIFT REWARDS LEADERBOARD SECTION */}
      {selectedCategoryFilter === 'Leaderboard' ? (
        <div className="space-y-3 animate-fade-in mb-6">
          <div className="p-3.5 bg-gradient-to-br from-[#FFF9DF] to-[#FFF3B8] border-2 border-[#111111] rounded-2xl shadow-xs">
            <div className="flex items-center gap-2 mb-1 text-[#111111]">
              <Gift size={18} className="text-[#d90429]" />
              <h3 className="text-sm font-black uppercase tracking-tight">Weekly Kitchen Gift Contest</h3>
            </div>
            <p className="text-[10px] font-bold text-[#444444] leading-relaxed">
              Post kitchen status updates & dish pitches to earn community likes & ratings. Top 3 kitchens win equipment vouchers & organic ingredient hampers every Sunday!
            </p>
          </div>

          <div className="space-y-2.5">
            {KITCHEN_LEADERBOARD.map((item) => (
              <div key={item.rank} className="p-3 bg-white border-2 border-black/10 rounded-2xl flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#111111] text-[#FFD21F] text-xs font-black flex items-center justify-center">
                    #{item.rank}
                  </span>
                  <img src={item.chefAvatar} alt={item.chefName} className="w-10 h-10 rounded-full object-cover border border-black/20" />
                  <div>
                    <h4 className="text-xs font-black text-[#111111]">{item.kitchenName}</h4>
                    <p className="text-[9.5px] font-bold text-[#707070]">{item.chefName} • {item.badge}</p>
                    <span className="text-[9px] font-black text-[#d90429]">{item.giftReward}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPage('book-a-cook');
                    showToast(`Booking ${item.chefName}`);
                  }}
                  className="px-2.5 py-1 bg-[#FFD21F] text-[#111111] text-[10px] font-black rounded-lg border border-black shadow-xs shrink-0 cursor-pointer"
                >
                  Book Chef
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* 4. COMMUNITY FEED STREAM POSTS */
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <article key={post.id} className="bg-white border-2 border-black/10 rounded-2xl overflow-hidden shadow-xs hover:border-black/20 transition-all">
              {/* Post Header: Chef Info */}
              <div className="p-3 flex items-center justify-between border-b border-black/5 bg-[#fffdf5]">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <img
                      src={post.chefAvatar}
                      alt={post.chefName}
                      className="w-10 h-10 rounded-full object-cover border border-black/20"
                    />
                    {post.isVerifiedChef && (
                      <CheckCircle2 size={12} className="absolute -bottom-0.5 -right-0.5 text-emerald-600 fill-emerald-600 bg-white rounded-full" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs font-black text-[#111111]">{post.kitchenName}</h3>
                      <span className="text-[8px] font-black bg-[#FFD21F] text-[#111111] px-1.5 py-0.2 rounded-full border border-black/20">
                        {post.rewardTier}
                      </span>
                    </div>
                    <p className="text-[9.5px] font-bold text-[#707070] flex items-center gap-1">
                      <span>{post.chefName}</span> •
                      <MapPin size={9} className="text-[#FFD21F] fill-[#FFD21F]" />
                      <span>{post.location}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9px] font-bold text-[#888888]">{post.timestamp}</span>
                </div>
              </div>

              {/* Status Badge & Caption */}
              <div className="p-3">
                {post.statusBadge && (
                  <div className="inline-flex items-center gap-1 bg-[#FFD21F]/20 text-[#111111] border border-[#FFD21F] px-2.5 py-0.5 rounded-full text-[10px] font-black mb-2">
                    <Flame size={11} className="text-[#FF3B30] fill-[#FF3B30]" />
                    {post.statusBadge}
                  </div>
                )}
                <p className="text-[11.5px] font-bold text-[#222222] leading-relaxed mb-2">
                  {post.caption}
                </p>

                {/* Dish Tags */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {post.dishTags.map((tag) => (
                    <span key={tag} className="text-[8.5px] font-black bg-gray-100 text-[#555555] px-2 py-0.5 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Media Card (Picture or Video) */}
              <div className="relative aspect-[16/9] w-full bg-gray-100 overflow-hidden border-y border-black/5">
                <ImageWithFallback
                  src={post.mediaUrl}
                  alt={post.kitchenName}
                  className="w-full h-full object-cover"
                />
                {post.mediaType === 'video' && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 text-[#111111] flex items-center justify-center shadow-md">
                      <Video size={22} className="fill-[#111111]" />
                    </div>
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-black/70 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-xs">
                  {post.mediaType === 'video' ? <Video size={10} /> : <ImageIcon size={10} />}
                  <span>{post.category}</span>
                </div>
              </div>

              {/* Interaction Action Bar (Like, Comment, Share) */}
              <div className="p-3 bg-[#ffffff] flex items-center justify-between border-t border-black/5">
                <div className="flex items-center gap-4">
                  {/* LIKE */}
                  <button
                    type="button"
                    onClick={() => handleToggleLike(post.id)}
                    className="flex items-center gap-1.5 text-xs font-black text-[#111111] active:scale-90 transition-transform cursor-pointer"
                  >
                    <Heart
                      size={18}
                      className={post.isLiked ? 'fill-[#FF3B30] text-[#FF3B30]' : 'text-[#707070]'}
                    />
                    <span>{post.likesCount}</span>
                  </button>

                  {/* COMMENT TOGGLE */}
                  <button
                    type="button"
                    onClick={() =>
                      setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)
                    }
                    className="flex items-center gap-1.5 text-xs font-black text-[#111111] active:scale-90 transition-transform cursor-pointer"
                  >
                    <MessageCircle size={18} className="text-[#707070]" />
                    <span>{post.commentsCount}</span>
                  </button>

                  {/* SHARE */}
                  <button
                    type="button"
                    onClick={() => handleSharePost(post.kitchenName)}
                    className="flex items-center gap-1.5 text-xs font-black text-[#111111] active:scale-90 transition-transform cursor-pointer"
                  >
                    <Share2 size={17} className="text-[#707070]" />
                    <span className="text-[10px] text-[#707070]">Share</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setPage('food-detail');
                    showToast(`Opening ${post.kitchenName} menu`);
                  }}
                  className="px-2.5 py-1 bg-[#111111] text-[#FFD21F] text-[10px] font-black rounded-full active:scale-95 transition-transform cursor-pointer"
                >
                  Order Food →
                </button>
              </div>

              {/* COMMENTS SECTION */}
              {activeCommentPostId === post.id && (
                <div className="p-3 bg-[#fffdf5] border-t border-black/10 space-y-2.5 animate-fade-in">
                  <h4 className="text-[11px] font-black text-[#111111]">Comments ({post.commentsList.length})</h4>

                  <div className="space-y-2 max-h-40 overflow-y-auto no-scrollbar">
                    {post.commentsList.map((c) => (
                      <div key={c.id} className="p-2 bg-white rounded-xl border border-black/5 flex items-start gap-2">
                        <img src={c.userAvatar} alt={c.userName} className="w-6 h-6 rounded-full object-cover mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-[#111111]">{c.userName}</span>
                            <span className="text-[8px] font-bold text-[#888888]">{c.timeAgo}</span>
                          </div>
                          <p className="text-[10px] font-medium text-[#444444] mt-0.5">{c.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Comment Input */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      value={commentInputText}
                      onChange={(e) => setCommentInputText(e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-1 bg-white border border-black/15 rounded-full px-3 py-1.5 text-xs font-bold text-[#111111] outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddComment(post.id)}
                      className="p-1.5 bg-[#FFD21F] text-[#111111] rounded-full border border-black shadow-xs active:scale-95 transition-transform cursor-pointer"
                    >
                      <Send size={13} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      {/* 5. CREATE KITCHEN PITCH MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-black rounded-3xl p-4 w-full max-w-[380px] shadow-2xl animate-fade-in text-left relative max-h-[90vh] overflow-y-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-3 right-3 p-1 rounded-full bg-gray-100 text-[#111111] hover:bg-gray-200"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-1.5 mb-1 text-[#FFD21F]">
              <Sparkles size={16} className="fill-[#FFD21F] text-[#111111]" />
              <h3 className="text-sm font-black text-[#111111]">Pitch Your Kitchen to Foodies</h3>
            </div>
            <p className="text-[10px] font-bold text-[#707070] mb-3">
              Share your live kitchen status, hygiene videos & signature dish prep to gain customer trust and win weekly Feazto Gift Vouchers!
            </p>

            <form onSubmit={handleCreatePost} className="space-y-3">
              <div>
                <label className="block text-[10px] font-black text-[#111111] mb-1">Kitchen Name</label>
                <input
                  type="text"
                  value={newKitchenName}
                  onChange={(e) => setNewKitchenName(e.target.value)}
                  className="w-full bg-gray-50 border border-black/15 rounded-xl px-3 py-1.5 text-xs font-bold text-[#111111] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-[#111111] mb-1">Chef Name</label>
                <input
                  type="text"
                  value={newChefName}
                  onChange={(e) => setNewChefName(e.target.value)}
                  className="w-full bg-gray-50 border border-black/15 rounded-xl px-3 py-1.5 text-xs font-bold text-[#111111] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-[#111111] mb-1">Pitch Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full bg-gray-50 border border-black/15 rounded-xl px-3 py-1.5 text-xs font-bold text-[#111111] outline-none"
                >
                  <option value="Live Cooking">Live Cooking</option>
                  <option value="Hygiene & Prep">Hygiene & Prep</option>
                  <option value="Special Menu Pitch">Special Menu Pitch</option>
                  <option value="Chef Story">Chef Story</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black text-[#111111] mb-1">Live Status Badge Text</label>
                <input
                  type="text"
                  value={newStatusBadge}
                  onChange={(e) => setNewStatusBadge(e.target.value)}
                  className="w-full bg-gray-50 border border-black/15 rounded-xl px-3 py-1.5 text-xs font-bold text-[#111111] outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-[#111111] mb-1">Kitchen Pitch Story / Caption</label>
                <textarea
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  rows={3}
                  className="w-full bg-gray-50 border border-black/15 rounded-xl p-2 text-xs font-bold text-[#111111] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-[#111111] mb-1">Photo / Video URL</label>
                <input
                  type="text"
                  value={newMediaUrl}
                  onChange={(e) => setNewMediaUrl(e.target.value)}
                  className="w-full bg-gray-50 border border-black/15 rounded-xl px-3 py-1.5 text-xs font-bold text-[#111111] outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#FFD21F] text-[#111111] text-xs font-black rounded-xl border border-black shadow-xs active:scale-95 transition-transform cursor-pointer"
              >
                Publish Kitchen Pitch 🚀
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
