'use client';

import { useState, useRef, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/app/lib/data';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Edit, Trash2, Plus, Image as ImageIcon, X } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { format } from 'date-fns';

const BlogFormSchema = z.object({
  title: z.string().min(5, 'Title is required.'),
  excerpt: z.string().min(10, 'Excerpt is required.'),
  content: z.string().min(20, 'Content is required.'),
  author: z.string().min(2, 'Author name is required.'),
  category: z.string().min(2, 'Category is required.'),
  imageUrl: z.string().min(1, 'Featured image is required.'),
});

const defaultFormValues = {
    title: '',
    excerpt: '',
    content: '',
    author: 'Admin',
    category: 'Local Guide',
    imageUrl: '',
};

export default function AdminBlogPage() {
  const { toast } = useToast();
  const [posts, setPosts] = useState(blogPosts);
  const [editingPost, setEditingPost] = useState(null);
  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(BlogFormSchema),
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    if (editingPost) {
      const getImageUrl = (imageIdentifier) => {
        if (!imageIdentifier) return '';
        if (imageIdentifier.startsWith('http') || imageIdentifier.startsWith('data:image')) {
            return imageIdentifier;
        }
        const placeholder = PlaceHolderImages.find(img => img.id === imageIdentifier);
        return placeholder ? placeholder.imageUrl : '';
      }

      form.reset({
        title: editingPost.title,
        excerpt: editingPost.excerpt,
        content: editingPost.content,
        author: editingPost.author,
        category: editingPost.category,
        imageUrl: getImageUrl(editingPost.image),
      });
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      form.reset(defaultFormValues);
    }
  }, [editingPost, form]);

  function onSubmit(data) {
    if (editingPost) {
      const updatedPost = {
          ...editingPost,
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          author: data.author,
          category: data.category,
          image: data.imageUrl,
      };
      setPosts(prev => prev.map(p => p.id === editingPost.id ? updatedPost : p));
      toast({
        title: 'Post Updated',
        description: `"${data.title}" has been successfully updated.`,
      });
      setEditingPost(null);
    } else {
      const newPost = {
          id: 'blog-' + Math.random().toString(36).substring(2, 7),
          slug: data.title.toLowerCase().replace(/\s+/g, '-'),
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          author: data.author,
          category: data.category,
          date: format(new Date(), 'MMMM dd, yyyy'),
          image: data.imageUrl,
      };
      setPosts(prev => [newPost, ...prev]);
      toast({
        title: 'Post Created',
        description: `"${data.title}" has been successfully published.`,
      });
    }
    form.reset(defaultFormValues);
  }

  const handleDelete = (postId) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    toast({
      title: 'Post Deleted',
      description: `The blog post has been removed.`,
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          form.setValue('imageUrl', reader.result, { shouldValidate: true });
        }
      };
      reader.readAsDataURL(file);
      event.target.value = '';
    }
  };

  const handleRemoveImage = () => {
    form.setValue('imageUrl', '', { shouldValidate: true });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline">Manage Blog</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 space-y-8" ref={formRef}>
            <Card className="rounded-[2rem] border-none shadow-lg bg-card">
                <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                    {editingPost ? <Edit className="w-5 h-5 text-primary" /> : <PlusCircle className="w-5 h-5 text-primary" />}
                    {editingPost ? 'Edit Post' : 'New Post'}
                </CardTitle>
                </CardHeader>
                <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Title</FormLabel>
                            <FormControl>
                            <Input placeholder="Post Title" {...field} className="rounded-xl border-slate-100 bg-slate-50/50" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="author"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Author</FormLabel>
                                <FormControl>
                                <Input {...field} className="rounded-xl border-slate-100 bg-slate-50/50" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Category</FormLabel>
                                <FormControl>
                                <Input {...field} className="rounded-xl border-slate-100 bg-slate-50/50" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="excerpt"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Short Excerpt</FormLabel>
                            <FormControl>
                            <Textarea placeholder="Brief summary..." {...field} className="rounded-xl border-slate-100 bg-slate-50/50" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Content</FormLabel>
                            <FormControl>
                            <Textarea placeholder="Write your story..." {...field} rows={8} className="rounded-xl border-slate-100 bg-slate-50/50" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                                Featured Image
                                {field.value && (
                                    <button 
                                        type="button" 
                                        onClick={handleRemoveImage}
                                        className="text-[9px] text-destructive font-black hover:underline"
                                    >
                                        Remove Image
                                    </button>
                                )}
                            </FormLabel>
                            <div className="space-y-4">
                                {field.value ? (
                                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-100 bg-slate-50/50 group">
                                        <img 
                                            src={field.value} 
                                            alt="Preview" 
                                            className="w-full h-full object-cover" 
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button 
                                                type="button" 
                                                variant="destructive" 
                                                size="sm" 
                                                className="rounded-full"
                                                onClick={handleRemoveImage}
                                            >
                                                <X className="w-4 h-4 mr-2" />
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full aspect-video rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center text-slate-400 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all"
                                    >
                                        <div className="bg-white p-3 rounded-full shadow-sm mb-2 border border-slate-100">
                                            <Plus className="h-6 w-6" />
                                        </div>
                                        <span className="text-xs font-bold">Upload Featured Image</span>
                                        <span className="text-[9px] uppercase tracking-[0.2em] mt-1 opacity-60">PNG, JPG or WebP</span>
                                    </button>
                                )}
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    onChange={handleImageUpload} 
                                    className="hidden" 
                                    accept="image/*" 
                                />
                            </div>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <div className="flex items-center gap-2 pt-4">
                         <Button type="submit" className="flex-1 h-14 rounded-2xl bg-secondary hover:bg-secondary/90 text-black text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-secondary/20 transition-all active:scale-[0.98]">
                            {editingPost ? 'Save Changes' : 'Publish Post'}
                        </Button>
                        {editingPost && (
                            <Button type="button" variant="outline" className="h-14 rounded-2xl px-6 border-slate-200 text-slate-400 font-bold" onClick={() => setEditingPost(null)}>
                                Cancel
                            </Button>
                        )}
                    </div>
                    </form>
                </Form>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold font-headline">Published Posts</h2>
             {posts.length === 0 ? (
                 <div className="p-12 text-center border-2 border-dashed rounded-[2.5rem] bg-card/50">
                     <ImageIcon className="w-12 h-12 mx-auto mb-4 text-slate-200" />
                     <p className="text-slate-400 font-medium">No blog posts found. Create your first one!</p>
                 </div>
             ) : (
                posts.map((post) => {
                    const postImg = (() => {
                        if (!post.image) return null;
                        if (post.image.startsWith('http') || post.image.startsWith('data:image')) return post.image;
                        const placeholder = PlaceHolderImages.find(img => img.id === post.image);
                        return placeholder ? placeholder.imageUrl : null;
                    })();

                    return (
                        <Card key={post.id} className="flex flex-col md:flex-row overflow-hidden rounded-[2.5rem] border-none shadow-sm hover:shadow-xl transition-all duration-500 bg-white group">
                            <div className="md:w-[40%] relative shrink-0 aspect-[4/3] md:aspect-auto overflow-hidden">
                                {postImg ? (
                                    <img src={postImg} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-50">
                                        <ImageIcon className="w-12 h-12 text-slate-200" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#085d6b]">{post.category}</p>
                                        <h3 className="font-bold text-2xl lg:text-3xl leading-tight text-slate-900 font-headline">{post.title}</h3>
                                    </div>
                                    <div className="hidden sm:block text-right text-[10px] text-slate-400 font-black uppercase tracking-[0.1em] shrink-0 ml-4">
                                        <p>{post.date}</p>
                                        <p className="text-slate-900/40">By {post.author}</p>
                                    </div>
                                </div>
                                <p className="text-slate-500 text-base mb-8 font-light leading-relaxed line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="rounded-full px-8 h-11 border-2 font-black uppercase tracking-widest text-[10px]" 
                                        onClick={() => setEditingPost(post)}
                                    >
                                        <Edit className="mr-2 h-4 w-4" /> 
                                        Edit
                                    </Button>
                                    <Button 
                                        variant="destructive" 
                                        size="sm" 
                                        className="rounded-full px-8 h-11 font-black uppercase tracking-widest text-[10px] shadow-none" 
                                        onClick={() => handleDelete(post.id)}
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" /> 
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    )
                })
             )}
        </div>
      </div>
    </div>
  );
}
