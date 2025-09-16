import React, { useState, useRef } from 'react';
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
  Upload, 
  Trash2, 
  Save, 
  Eye,
  FileText,
  BookOpen
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import strapiApi from '@/services/strapiApi';
import paddleService from '@/services/paddleService';
import { toast } from 'sonner';

const EbookCreation = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [access, setAccess] = useState<'Free' | 'Paid' | 'Premium'>('Free');
  const [price, setPrice] = useState(9.99);
  const [pages, setPages] = useState(0);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [ebookFile, setEbookFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const ebookFileInputRef = useRef<HTMLInputElement>(null);

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onload = event => {
        setCoverImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEbookFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEbookFile(file);
    }
  };

  const removeCoverImage = () => {
    setCoverImage(null);
    setCoverImagePreview(null);
    if (coverImageInputRef.current) {
      coverImageInputRef.current.value = '';
    }
  };

  const removeEbookFile = () => {
    setEbookFile(null);
    if (ebookFileInputRef.current) {
      ebookFileInputRef.current.value = '';
    }
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
    
    if (!ebookFile) {
      toast.error("Please upload your e-book file");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Upload cover image if provided
      let coverImageUrl = '';
      if (coverImage) {
        coverImageUrl = await uploadFile(coverImage);
      }
      
      // Upload ebook file
      const ebookFileUrl = await uploadFile(ebookFile);
      
      // Create product in Paddle
      const productResponse = await paddleService.createProduct({
        name: title,
        description: description,
        price: access === 'Free' ? 0 : price,
        currency: 'USD',
        category: 'Education',
        tax_category: 'standard',
        custom_fields: [
          { name: 'product_type', value: 'ebook' },
          { name: 'creator_id', value: user?.id || '' }
        ]
      });
      
      if (!productResponse.success) {
        throw new Error(productResponse.error || 'Failed to create product in Paddle');
      }
      
      // Prepare ebook data for Strapi
      const ebookData: any = {
        title,
        description,
        access,
        price: access === 'Free' ? 0 : price,
        pages,
        PaddleProductID: productResponse.product_id,
        CoverImage: coverImageUrl ? { url: coverImageUrl } : null,
        file: [{ 
          url: ebookFileUrl, 
          name: ebookFile.name,
          size: ebookFile.size,
          type: ebookFile.type
        }],
        // Add missing required fields
        category: 'Technology', // Default category
        creator: user?.id || '', // Use user ID as creator
        fileUrl: ebookFileUrl // Use the uploaded file URL
      };
      
      // Create ebook in Strapi
      await strapiApi.createEbook(ebookData);
      
      toast.success("E-book created successfully! It's now in draft mode.");
      navigate('/creator-dashboard');
    } catch (error) {
      toast.error("Failed to create e-book. Please try again.");
      console.error("Ebook creation error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-white">Please sign in to create an e-book.</p>
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
          <h1 className="text-3xl font-bold text-white">Create New E-book</h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* E-book Information */}
              <Card className="bg-dark-purple border-primary-purple/30">
                <CardHeader>
                  <CardTitle className="text-white">E-book Information</CardTitle>
                  <CardDescription className="text-white/70">
                    Provide basic information about your e-book
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-white">E-book Title *</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-dark-purple border-primary-purple/30 text-white"
                      placeholder="Enter e-book title"
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
                      placeholder="Describe what readers will learn from this e-book"
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-white">Access Type</Label>
                      <Select value={access} onValueChange={(value: any) => setAccess(value)}>
                        <SelectTrigger className="bg-dark-purple border-primary-purple/30 text-white">
                          <SelectValue placeholder="Select access type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Free">Free</SelectItem>
                          <SelectItem value="Paid">Paid</SelectItem>
                          <SelectItem value="Premium">Premium (for Premium subscribers)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {(access === 'Paid' || access === 'Premium') && (
                      <div className="space-y-2">
                        <Label htmlFor="price" className="text-white">
                          {access === 'Premium' ? 'Suggested Price ($)' : 'Price ($)'}
                        </Label>
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
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pages" className="text-white">Number of Pages</Label>
                    <Input
                      id="pages"
                      type="number"
                      value={pages || ''}
                      onChange={(e) => setPages(parseInt(e.target.value) || 0)}
                      className="bg-dark-purple border-primary-purple/30 text-white"
                      min="0"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Cover Image */}
              <Card className="bg-dark-purple border-primary-purple/30">
                <CardHeader>
                  <CardTitle className="text-white">Cover Image</CardTitle>
                  <CardDescription className="text-white/70">
                    Upload an attractive cover for your e-book
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="aspect-[2/3] rounded-lg bg-gradient-to-br from-primary-purple/20 to-dark-purple border border-primary-purple/30 flex items-center justify-center overflow-hidden">
                        {coverImagePreview ? (
                          <img 
                            src={coverImagePreview} 
                            alt="Cover preview" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center">
                            <Upload className="h-8 w-8 text-primary-purple/50 mx-auto mb-2" />
                            <p className="text-white/50 text-sm">No cover uploaded</p>
                          </div>
                        )}
                      </div>
                      
                      {coverImagePreview && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={removeCoverImage}
                          className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div>
                      <input
                        id="cover-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleCoverImageChange}
                        ref={coverImageInputRef}
                      />
                      <Label htmlFor="cover-upload">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full border-primary-purple/30 text-white hover:bg-primary-purple/10"
                          onClick={() => document.getElementById('cover-upload')?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {coverImage ? 'Change Cover' : 'Upload Cover'}
                        </Button>
                      </Label>
                      <p className="text-white/50 text-xs mt-2 text-center">
                        Recommended size: 800x1200px
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* E-book File */}
              <Card className="bg-dark-purple border-primary-purple/30">
                <CardHeader>
                  <CardTitle className="text-white">E-book File</CardTitle>
                  <CardDescription className="text-white/70">
                    Upload your e-book file (PDF recommended)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <input
                        id="ebook-upload"
                        type="file"
                        accept=".pdf,.epub,.mobi"
                        className="hidden"
                        onChange={handleEbookFileChange}
                        ref={ebookFileInputRef}
                      />
                      <Label htmlFor="ebook-upload">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full border-primary-purple/30 text-white hover:bg-primary-purple/10"
                          onClick={() => document.getElementById('ebook-upload')?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {ebookFile ? 'Change E-book File' : 'Upload E-book File'}
                        </Button>
                      </Label>
                      <p className="text-white/50 text-xs mt-2 text-center">
                        Supported formats: PDF, EPUB, MOBI
                      </p>
                    </div>
                    
                    {ebookFile && (
                      <div className="p-3 bg-black/20 rounded-lg border border-primary-purple/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary-purple" />
                            <div>
                              <p className="text-white text-sm font-medium truncate max-w-[150px]">
                                {ebookFile.name}
                              </p>
                              <p className="text-white/70 text-xs">
                                {(ebookFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={removeEbookFile}
                            className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* E-book Preview */}
              <Card className="bg-dark-purple border-primary-purple/30">
                <CardHeader>
                  <CardTitle className="text-white">E-book Preview</CardTitle>
                  <CardDescription className="text-white/70">
                    How your e-book will appear to readers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="aspect-[2/3] rounded-lg bg-gradient-to-br from-primary-purple/10 to-dark-purple border border-primary-purple/20 flex items-center justify-center">
                      {coverImagePreview ? (
                        <img 
                          src={coverImagePreview} 
                          alt="E-book preview" 
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <BookOpen className="h-8 w-8 text-primary-purple/50" />
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-white line-clamp-2">{title || 'E-book Title'}</h3>
                      <p className="text-white/70 text-sm mt-1 line-clamp-2">
                        {description || 'E-book description will appear here'}
                      </p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <Badge 
                          variant="secondary" 
                          className={
                            access === 'Free' ? 'bg-green-500/20 text-green-500' : 
                            access === 'Paid' ? 'bg-blue-500/20 text-blue-500' : 
                            'bg-purple-500/20 text-purple-500'
                          }
                        >
                          {access}
                        </Badge>
                        {access !== 'Free' && (
                          <span className="text-primary-purple font-semibold">
                            ${price.toFixed(2)}
                          </span>
                        )}
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
                          Creating E-book...
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
                      Preview E-book
                    </Button>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="text-white/50 text-xs">
                      Your e-book will be reviewed before publication
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

export default EbookCreation;