import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Play, 
  Plus, 
  Upload, 
  Trash2, 
  Save, 
  Eye,
  BookOpen,
  Clock,
  BarChart3
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import paddleService from '@/services/paddleService';
import strapiApi from '@/services/strapiApi';

interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  duration?: number;
}

const CourseCreation = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(19.99);
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [language, setLanguage] = useState<'English' | 'French' | 'Arabic' | 'Spanish' | 'Portuguese'>('English');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([
    { id: '1', title: '', description: '', duration: 0 }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onload = event => {
        setThumbnailPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview(null);
  };

  const addLesson = () => {
    setLessons([
      ...lessons,
      { id: Date.now().toString(), title: '', description: '', duration: 0 }
    ]);
  };

  const updateLesson = (id: string, field: keyof Lesson, value: string | number) => {
    setLessons(lessons.map(lesson => 
      lesson.id === id ? { ...lesson, [field]: value } : lesson
    ));
  };

  const removeLesson = (id: string) => {
    if (lessons.length <= 1) {
      toast.error("You must have at least one lesson");
      return;
    }
    setLessons(lessons.filter(lesson => lesson.id !== id));
  };

  const uploadFile = async (file: File): Promise<string> => {
    // Simulate file upload
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return a mock URL - in a real app this would be the actual uploaded file URL
        resolve(URL.createObjectURL(file));
      }, 500);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (lessons.some(lesson => !lesson.title || !lesson.description)) {
      toast.error("Please fill in all lesson details");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Upload thumbnail if provided
      let thumbnailUrl = '';
      if (thumbnail) {
        thumbnailUrl = await uploadFile(thumbnail);
      }
      
      // Create product in Paddle
      const productResponse = await paddleService.createProduct({
        name: title,
        description: description,
        price: price,
        currency: 'USD',
        category: 'Education',
        tax_category: 'standard',
        custom_fields: [
          { name: 'product_type', value: 'course' },
          { name: 'creator_id', value: user?.id || '' }
        ]
      });
      
      if (!productResponse.success) {
        throw new Error(productResponse.error || 'Failed to create product in Paddle');
      }
      
      // Prepare course data with Paddle product ID
      const courseData = {
        title,
        description,
        price,
        level,
        language,
        status: "Draft",
        PaddleProductID: productResponse.product_id,
        thumbnail: thumbnailUrl ? { url: thumbnailUrl } : null,
        lessons: lessons.map(lesson => ({
          title: lesson.title,
          description: lesson.description,
          duration: lesson.duration
        }))
      };
      
      // In a real app, you would create course in Strapi
      // await strapiApi.createCourse(courseData);
      
      toast.success("Course created successfully! It's now in draft mode.");
      navigate('/creator-dashboard');
    } catch (error) {
      toast.error("Failed to create course. Please try again.");
      console.error("Course creation error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-white">Please sign in to create a course.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/creator-dashboard')}
            className="border-primary-purple/30 text-white hover:bg-primary-purple/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-white">Create New Course</h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Course Information */}
              <Card className="bg-dark-purple border-primary-purple/30">
                <CardHeader>
                  <CardTitle className="text-white">Course Information</CardTitle>
                  <CardDescription className="text-white/70">
                    Provide basic information about your course
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-white">Course Title *</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-dark-purple border-primary-purple/30 text-white"
                      placeholder="Enter course title"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-white">Description *</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="bg-dark-purple border-primary-purple/30 text-white resize-none"
                      placeholder="Describe what students will learn in this course"
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-white">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                        className="bg-dark-purple border-primary-purple/30 text-white"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-white">Level</Label>
                      <Select value={level} onValueChange={(value) => setLevel(value as 'Beginner' | 'Intermediate' | 'Advanced')}>
                        <SelectTrigger className="bg-dark-purple border-primary-purple/30 text-white">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-white">Language</Label>
                      <Select value={language} onValueChange={(value) => setLanguage(value as 'English' | 'French' | 'Arabic' | 'Spanish' | 'Portuguese')}>
                        <SelectTrigger className="bg-dark-purple border-primary-purple/30 text-white">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="French">French</SelectItem>
                          <SelectItem value="Arabic">Arabic</SelectItem>
                          <SelectItem value="Spanish">Spanish</SelectItem>
                          <SelectItem value="Portuguese">Portuguese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Lessons */}
              <Card className="bg-dark-purple border-primary-purple/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Lessons</CardTitle>
                      <CardDescription className="text-white/70">
                        Create lessons for your course
                      </CardDescription>
                    </div>
                    <Button 
                      type="button"
                      onClick={addLesson}
                      className="bg-primary-purple hover:bg-primary-purple/90"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Lesson
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {lessons.map((lesson, index) => (
                    <Card key={lesson.id} className="bg-black/20 border-primary-purple/20">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium text-white">Lesson {index + 1}</h3>
                          {lessons.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeLesson(lesson.id)}
                              className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`lesson-title-${lesson.id}`} className="text-white/80 text-sm">
                              Lesson Title *
                            </Label>
                            <Input
                              id={`lesson-title-${lesson.id}`}
                              value={lesson.title}
                              onChange={(e) => updateLesson(lesson.id, 'title', e.target.value)}
                              className="bg-dark-purple border-primary-purple/30 text-white text-sm"
                              placeholder="Enter lesson title"
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`lesson-description-${lesson.id}`} className="text-white/80 text-sm">
                              Description *
                            </Label>
                            <Textarea
                              id={`lesson-description-${lesson.id}`}
                              value={lesson.description}
                              onChange={(e) => updateLesson(lesson.id, 'description', e.target.value)}
                              className="bg-dark-purple border-primary-purple/30 text-white text-sm resize-none"
                              placeholder="Describe what students will learn in this lesson"
                              rows={2}
                              required
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`lesson-duration-${lesson.id}`} className="text-white/80 text-sm">
                                Duration (minutes)
                              </Label>
                              <Input
                                id={`lesson-duration-${lesson.id}`}
                                type="number"
                                value={lesson.duration || ''}
                                onChange={(e) => updateLesson(lesson.id, 'duration', parseInt(e.target.value) || 0)}
                                className="bg-dark-purple border-primary-purple/30 text-white text-sm"
                                min="0"
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Thumbnail */}
              <Card className="bg-dark-purple border-primary-purple/30">
                <CardHeader>
                  <CardTitle className="text-white">Course Thumbnail</CardTitle>
                  <CardDescription className="text-white/70">
                    Upload an attractive thumbnail for your course
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="aspect-video rounded-lg bg-gradient-to-br from-primary-purple/20 to-dark-purple border border-primary-purple/30 flex items-center justify-center overflow-hidden">
                        {thumbnailPreview ? (
                          <img 
                            src={thumbnailPreview} 
                            alt="Thumbnail preview" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center">
                            <Upload className="h-8 w-8 text-primary-purple/50 mx-auto mb-2" />
                            <p className="text-white/50 text-sm">No thumbnail uploaded</p>
                          </div>
                        )}
                      </div>
                      
                      {thumbnailPreview && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={removeThumbnail}
                          className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div>
                      <input
                        id="thumbnail-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleThumbnailChange}
                      />
                      <Label htmlFor="thumbnail-upload">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full border-primary-purple/30 text-white hover:bg-primary-purple/10"
                          onClick={() => document.getElementById('thumbnail-upload')?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {thumbnail ? 'Change Thumbnail' : 'Upload Thumbnail'}
                        </Button>
                      </Label>
                      <p className="text-white/50 text-xs mt-2 text-center">
                        Recommended size: 1200x675px
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Course Preview */}
              <Card className="bg-dark-purple border-primary-purple/30">
                <CardHeader>
                  <CardTitle className="text-white">Course Preview</CardTitle>
                  <CardDescription className="text-white/70">
                    How your course will appear to students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="aspect-video rounded-lg bg-gradient-to-br from-primary-purple/10 to-dark-purple border border-primary-purple/20 flex items-center justify-center">
                      {thumbnailPreview ? (
                        <img 
                          src={thumbnailPreview} 
                          alt="Course preview" 
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <BookOpen className="h-8 w-8 text-primary-purple/50" />
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-white line-clamp-2">{title || 'Course Title'}</h3>
                      <p className="text-white/70 text-sm mt-1 line-clamp-2">
                        {description || 'Course description will appear here'}
                      </p>
                      
                      <div className="flex items-center gap-4 mt-3 text-sm text-white/70">
                        <div className="flex items-center gap-1">
                          <Play className="h-4 w-4" />
                          <span>{lessons.length} lessons</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>
                            {lessons.reduce((total, lesson) => total + (lesson.duration || 0), 0)} min
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-primary-purple font-semibold">
                          ${price.toFixed(2)}
                        </span>
                        <Badge variant="secondary" className="bg-primary-purple/20 text-primary-purple">
                          {level}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Actions */}
              <Card className="bg-dark-purple border-primary-purple/30">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-primary-purple hover:bg-primary-purple/90"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                          Creating Course...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save as Draft
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      type="button"
                      variant="outline"
                      disabled={isSubmitting}
                      className="w-full border-primary-purple/30 text-white hover:bg-primary-purple/10"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview Course
                    </Button>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="text-white/50 text-xs">
                      Your course will be reviewed before publication
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
      
      <Footer />
    </div>
  );
};

export default CourseCreation;