import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Upload, Link, Save, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';

const CourseCreation = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnail: null as File | null,
    videoUrl: '',
    price: '',
    category: '',
    difficulty: '',
    language: '',
    supportingFile: null as File | null
  });

  const categories = [
    'Programming',
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Design',
    'Marketing',
    'Business',
    'Photography',
    'Music',
    'Cooking',
    'Art',
    'Language Learning'
  ];

  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
  const languages = ['English', 'Arabic', 'French', 'Spanish', 'German'];

  const steps = [
    { number: 1, title: 'Basic Information', description: 'Title and description' },
    { number: 2, title: 'Media', description: 'Thumbnail and video' },
    { number: 3, title: 'Pricing & Category', description: 'Set price and category' },
    { number: 4, title: 'Course Details', description: 'Difficulty and language' },
    { number: 5, title: 'Supporting Materials', description: 'Optional files' },
    { number: 6, title: 'Review & Submit', description: 'Final review' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = () => {
    toast.success("Course saved as draft!", {
      description: "You can continue editing later from your creator dashboard."
    });
    navigate('/creator-dashboard');
  };

  const handleSubmitForReview = () => {
    toast.success("Course submitted for review!", {
      description: "We'll review your course and notify you within 24-48 hours."
    });
    navigate('/creator-dashboard');
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.title.trim() && formData.description.trim();
      case 2:
        return formData.videoUrl.trim();
      case 3:
        return formData.price && formData.category;
      case 4:
        return formData.difficulty && formData.language;
      case 5:
        return true; // Optional step
      case 6:
        return true; // Review step
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="title" className="text-white">Course Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Complete React Development Course"
                className="bg-gray-800 border-gray-600 text-white mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="description" className="text-white">Course Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe what students will learn in this course..."
                className="bg-gray-800 border-gray-600 text-white mt-2 min-h-[120px]"
              />
              <p className="text-sm text-gray-400 mt-1">
                This will be used to generate an AI summary for potential students.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-white">Course Thumbnail</Label>
              <div className="mt-2 border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-300 mb-2">Upload course thumbnail</p>
                <p className="text-sm text-gray-400">PNG, JPG up to 2MB</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange('thumbnail', e.target.files?.[0] || null)}
                  className="mt-2"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="videoUrl" className="text-white">YouTube Video URL *</Label>
              <div className="mt-2 flex items-center gap-2">
                <Link className="h-5 w-5 text-gray-400" />
                <Input
                  id="videoUrl"
                  value={formData.videoUrl}
                  onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <p className="text-sm text-gray-400 mt-1">
                Students will see the first 1 minute for free as a preview.
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="price" className="text-white">Price (USD) *</Label>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-gray-300">$</span>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="29.99"
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <p className="text-sm text-gray-400 mt-1">
                Other currencies will be calculated automatically for students.
              </p>
            </div>
            
            <div>
              <Label className="text-white">Category *</Label>
              <Select onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white mt-2">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="text-white">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-white">Difficulty Level *</Label>
              <Select onValueChange={(value) => handleInputChange('difficulty', value)}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white mt-2">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {difficulties.map((level) => (
                    <SelectItem key={level} value={level} className="text-white">
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-white">Course Language *</Label>
              <Select onValueChange={(value) => handleInputChange('language', value)}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white mt-2">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang} className="text-white">
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-white">Supporting File (Optional)</Label>
              <div className="mt-2 border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-300 mb-2">Upload supporting materials</p>
                <p className="text-sm text-gray-400">PDF, ZIP, images up to 10MB</p>
                <input
                  type="file"
                  accept=".pdf,.zip,.png,.jpg,.jpeg"
                  onChange={(e) => handleFileChange('supportingFile', e.target.files?.[0] || null)}
                  className="mt-2"
                />
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Students will get access to this file after purchasing the course.
              </p>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Review Your Course</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-400">Title</Label>
                  <p className="text-white">{formData.title}</p>
                </div>
                
                <div>
                  <Label className="text-gray-400">Price</Label>
                  <p className="text-white">${formData.price}</p>
                </div>
                
                <div>
                  <Label className="text-gray-400">Category</Label>
                  <p className="text-white">{formData.category}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-400">Difficulty</Label>
                  <p className="text-white">{formData.difficulty}</p>
                </div>
                
                <div>
                  <Label className="text-gray-400">Language</Label>
                  <p className="text-white">{formData.language}</p>
                </div>
                
                <div>
                  <Label className="text-gray-400">Video URL</Label>
                  <p className="text-white text-sm break-all">{formData.videoUrl}</p>
                </div>
              </div>
            </div>
            
            <div>
              <Label className="text-gray-400">Description</Label>
              <p className="text-white">{formData.description}</p>
            </div>
            
            <div className="p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
              <p className="text-blue-200 text-sm">
                After submission, your course will be reviewed within 24-48 hours. 
                You'll receive an email notification once it's approved and published.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button 
            variant="outline" 
            className="mb-6 text-white border-white/20 hover:bg-white/10"
            onClick={() => navigate('/creator-dashboard')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create New Course</h1>
            <p className="text-gray-400">Step {currentStep} of {steps.length}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col items-center text-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step.number <= currentStep 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-600 text-gray-300'
                    }`}
                  >
                    {step.number}
                  </div>
                  <p className={`text-xs mt-1 ${
                    step.number <= currentStep ? 'text-white' : 'text-gray-400'
                  }`}>
                    {step.title.split(' ')[0]}
                  </p>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Content */}
          <Card className="bg-card border-border p-8 mb-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">
                {steps[currentStep - 1].title}
              </h2>
              <p className="text-gray-400">{steps[currentStep - 1].description}</p>
            </div>

            {renderStepContent()}
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <div>
              {currentStep > 1 && (
                <Button 
                  variant="outline" 
                  onClick={handlePrev}
                  className="text-white border-gray-600 hover:bg-gray-700"
                >
                  Previous
                </Button>
              )}
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={handleSaveDraft}
                className="text-white border-gray-600 hover:bg-gray-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save as Draft
              </Button>

              {currentStep < steps.length ? (
                <Button 
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmitForReview}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit for Review
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCreation;