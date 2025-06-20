import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { BlogPost, CreateBlogPost } from '@/types/blog';
import { calculateReadingTime, generateExcerpt } from '@/utils/blogUtils';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    const posts = await db
      .collection('posts')
      .find({ published: true })
      .sort({ createdAt: -1 })
      .toArray();

    const formattedPosts = posts.map(post => ({
      ...post,
      _id: post._id.toString(),
    }));

    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: CreateBlogPost = await request.json();
    
    if (!data.title || !data.content || !data.author?.name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    
    const now = new Date();
    const readingTime = calculateReadingTime(data.content);
    const excerpt = generateExcerpt(data.content);

    const blogPost: Omit<BlogPost, '_id'> = {
      title: data.title,
      content: data.content,
      excerpt,
      author: data.author,
      tags: data.tags || [],
      createdAt: now,
      updatedAt: now,
      readingTime,
      published: data.published,
    };

    const result = await db.collection('posts').insertOne(blogPost);
    
    return NextResponse.json(
      { 
        message: 'Post created successfully',
        postId: result.insertedId.toString()
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
} 