import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import {
  LiquidGlassView,
  LiquidGlassContainerView,
  isLiquidGlassSupported,
} from '@callstack/liquid-glass';

const extractImageFromHTML = html => {
  const match = html?.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
};

const BlogCard = ({ post, index }) => {
  const imageUrl =
    post.thumbnail ||
    extractImageFromHTML(post.description) ||
    extractImageFromHTML(post.content);

  return (
    <View style={[styles.cardWrapper, { marginTop: index === 0 ? 0 : 20 }]}>
      <LiquidGlassView
        style={[
          styles.card,
          !isLiquidGlassSupported && {
            backgroundColor: 'rgba(0, 212, 170, 0.08)',
          },
        ]}
        interactive={false}
        effect="clear"
      >
        {imageUrl && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: imageUrl }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.imageOverlay} />
          </View>
        )}
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle} numberOfLines={3}>
            {post.title}
          </Text>
          <View style={styles.cardFooter}>
            <Text style={styles.cardDate}>
              {new Date(post.pubDate).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </Text>
            <View style={styles.readTimeBadge}>
              <Text style={styles.readTimeText}>5 min read</Text>
            </View>
          </View>
        </View>
      </LiquidGlassView>
    </View>
  );
};

const LoadingSkeleton = () => (
  <View style={[styles.cardWrapper, { marginTop: 20 }]}>
    <LiquidGlassView
      style={[
        styles.skeletonCard,
        !isLiquidGlassSupported && { backgroundColor: 'rgba(30, 30, 30, 0.8)' },
      ]}
      interactive={false}
      effect="clear"
    >
      <View style={styles.skeletonImage} />
      <View style={styles.skeletonContent}>
        <View style={styles.skeletonTitle} />
        <View style={styles.skeletonTitleSecond} />
        <View style={styles.skeletonDate} />
      </View>
    </LiquidGlassView>
  </View>
);

const Home = () => {
  const [mediumPosts, setMediumPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), 5000),
        );

        const fetchPromise = fetch(
          'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@shubhanshubb',
        );

        const response = await Promise.race([fetchPromise, timeoutPromise]);

        if (!response.ok) throw new Error('Failed to fetch blog posts');

        const data = await response.json();

        if (data.status === 'ok' && data.items && data.items.length > 0) {
          setMediumPosts(data.items.slice(0, 6));
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      <LiquidGlassContainerView style={styles.containerGlass}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Latest Articles</Text>
            <Text style={styles.headerSubtitle}>Insights & Experiences</Text>
          </View>

          {loading ? (
            <>
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </>
          ) : mediumPosts.length > 0 ? (
            mediumPosts.map((post, index) => (
              <BlogCard key={index} post={post} index={index} />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <LiquidGlassView
                style={[
                  styles.emptyCard,
                  !isLiquidGlassSupported && {
                    backgroundColor: 'rgba(0, 212, 170, 0.05)',
                  },
                ]}
                interactive={false}
                effect="clear"
              >
                <Text style={styles.emptyText}>No articles found</Text>
                <Text style={styles.emptySubtext}>
                  Check back later for new content
                </Text>
              </LiquidGlassView>
            </View>
          )}
        </ScrollView>
      </LiquidGlassContainerView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  containerGlass: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#00D4AA',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  cardWrapper: {
    width: '100%',
  },
  card: {
    width: '100%',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.2)',
    overflow: 'hidden',
    shadowColor: '#00D4AA',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  imageContainer: {
    width: '100%',
    height: 220,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 220,
    resizeMode: 'center',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  cardContent: {
    padding: 24,
    paddingTop: 20,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardDate: {
    color: '#B0B0B0',
    fontSize: 14,
    fontWeight: '500',
  },
  readTimeBadge: {
    backgroundColor: 'rgba(0, 212, 170, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.3)',
  },
  readTimeText: {
    color: '#00D4AA',
    fontSize: 12,
    fontWeight: '600',
  },
  skeletonCard: {
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  skeletonImage: {
    width: '100%',
    height: 220,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  skeletonContent: {
    padding: 24,
  },
  skeletonTitle: {
    height: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 9,
    marginBottom: 8,
    width: '90%',
  },
  skeletonTitleSecond: {
    height: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 9,
    marginBottom: 16,
    width: '70%',
  },
  skeletonDate: {
    height: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 7,
    width: '40%',
  },
  emptyContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  emptyCard: {
    padding: 40,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.2)',
    width: '100%',
    overflow: 'hidden',
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#B0B0B0',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '400',
  },
});
