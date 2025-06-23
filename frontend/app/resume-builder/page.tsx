'use client';

import { useState } from 'react';
import Header from '@/components/header';
import { Button } from '@/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card';
import { Input } from '@/components/input';
import { Label } from '@/components/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/tabs';
import { Badge } from '@/components/badge';
import { 
  FileText, 
  Download, 
  Eye, 
  Wand2, 
  Plus,
  Trash2,
  GripVertical,
  Star,
  Briefcase,
  GraduationCap,
  Award,
  Sparkles,
  Brain,
  Zap,
  Target
} from 'lucide-react';

export default function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState('personal');
  const [resumeData, setResumeData] = useState({
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: []
  });

  const templates = [
    { id: 'modern', name: 'Modern Professional', color: 'from-cyan-500 to-cyan-600' },
    { id: 'creative', name: 'Creative Bold', color: 'from-cyan-500 to-cyan-600' },
    { id: 'minimal', name: 'Minimal Elegant', color: 'from-gray-500 to-gray-600' },
    { id: 'executive', name: 'Executive Premium', color: 'from-indigo-500 to-indigo-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-cyan-900/20">
      <Header />
      
      <div className="pt-20">
        {/* Header Section */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold gradient-text mb-3">Resume Builder</h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">Create a professional resume that stands out with AI assistance</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button disabled variant="outline" className="flex items-center px-6 py-3 rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300">
                  <Eye className="w-5 h-5 mr-2" />
                  Preview
                </Button>
                <Button disabled className="flex items-center bg-gradient-to-r from-cyan-600 to-cyan-600 hover:from-cyan-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Resume Builder Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl">
                <CardHeader className="border-b border-gray-100 dark:border-gray-700">
                  <CardTitle className="flex items-center text-2xl">
                    <FileText className="w-6 h-6 mr-3 text-cyan-600" />
                    Build Your Resume
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Fill in your information and our AI will help optimize your content for maximum impact
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <Tabs value={currentStep} onValueChange={setCurrentStep}>
                    <TabsList className="grid w-full grid-cols-5 mb-8 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
                      <TabsTrigger value="personal" className="rounded-lg font-medium">Personal</TabsTrigger>
                      <TabsTrigger value="experience" className="rounded-lg font-medium">Experience</TabsTrigger>
                      <TabsTrigger value="education" className="rounded-lg font-medium">Education</TabsTrigger>
                      <TabsTrigger value="skills" className="rounded-lg font-medium">Skills</TabsTrigger>
                      <TabsTrigger value="projects" className="rounded-lg font-medium">Projects</TabsTrigger>
                    </TabsList>

                    <TabsContent value="personal" className="space-y-8 mt-8">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-2xl font-semibold">Personal Information</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                          <Input 
                            id="firstName" 
                            placeholder="John"
                            className="h-12 rounded-xl border-2 focus:border-cyan-500 transition-colors"
                            value={resumeData.personal.firstName}
                            onChange={(e) => setResumeData({
                              ...resumeData,
                              personal: { ...resumeData.personal, firstName: e.target.value }
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                          <Input 
                            id="lastName" 
                            placeholder="Doe"
                            className="h-12 rounded-xl border-2 focus:border-cyan-500 transition-colors"
                            value={resumeData.personal.lastName}
                            onChange={(e) => setResumeData({
                              ...resumeData,
                              personal: { ...resumeData.personal, lastName: e.target.value }
                            })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                          <Input 
                            id="email" 
                            type="email"
                            placeholder="john.doe@email.com"
                            className="h-12 rounded-xl border-2 focus:border-cyan-500 transition-colors"
                            value={resumeData.personal.email}
                            onChange={(e) => setResumeData({
                              ...resumeData,
                              personal: { ...resumeData.personal, email: e.target.value }
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
                          <Input 
                            id="phone" 
                            placeholder="+1 (555) 123-4567"
                            className="h-12 rounded-xl border-2 focus:border-cyan-500 transition-colors"
                            value={resumeData.personal.phone}
                            onChange={(e) => setResumeData({
                              ...resumeData,
                              personal: { ...resumeData.personal, phone: e.target.value }
                            })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                        <Input 
                          id="location" 
                          placeholder="San Francisco, CA"
                          className="h-12 rounded-xl border-2 focus:border-cyan-500 transition-colors"
                          value={resumeData.personal.location}
                          onChange={(e) => setResumeData({
                            ...resumeData,
                            personal: { ...resumeData.personal, location: e.target.value }
                          })}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="linkedin" className="text-sm font-medium">LinkedIn</Label>
                          <Input 
                            id="linkedin" 
                            placeholder="linkedin.com/in/johndoe"
                            className="h-12 rounded-xl border-2 focus:border-cyan-500 transition-colors"
                            value={resumeData.personal.linkedin}
                            onChange={(e) => setResumeData({
                              ...resumeData,
                              personal: { ...resumeData.personal, linkedin: e.target.value }
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website" className="text-sm font-medium">Website/Portfolio</Label>
                          <Input 
                            id="website" 
                            placeholder="johndoe.com"
                            className="h-12 rounded-xl border-2 focus:border-cyan-500 transition-colors"
                            value={resumeData.personal.website}
                            onChange={(e) => setResumeData({
                              ...resumeData,
                              personal: { ...resumeData.personal, website: e.target.value }
                            })}
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="experience" className="space-y-8 mt-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center">
                            <Briefcase className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-2xl font-semibold">Work Experience</h3>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-xl border-2">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Experience
                        </Button>
                      </div>
                      
                      <Card className="border-dashed border-2 border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-800/50">
                        <CardContent className="p-12 text-center">
                          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                          <h4 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">Add Your First Job</h4>
                          <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg">Share your work experience to showcase your professional journey</p>
                          <Button className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white px-8 py-3 rounded-xl">
                            <Plus className="w-5 h-5 mr-2" />
                            Add Work Experience
                          </Button>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="education" className="space-y-8 mt-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
                            <GraduationCap className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-2xl font-semibold">Education</h3>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-xl border-2">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Education
                        </Button>
                      </div>
                      
                      <Card className="border-dashed border-2 border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-800/50">
                        <CardContent className="p-12 text-center">
                          <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                          <h4 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">Add Your Education</h4>
                          <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg">Include your academic background and qualifications</p>
                          <Button className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-8 py-3 rounded-xl">
                            <Plus className="w-5 h-5 mr-2" />
                            Add Education
                          </Button>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="skills" className="space-y-8 mt-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-2xl font-semibold">Skills</h3>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-xl border-2">
                          <Wand2 className="w-4 h-4 mr-2" />
                          AI Suggest
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        <Label htmlFor="skills-input" className="text-sm font-medium">Add Skills</Label>
                        <Input 
                          id="skills-input" 
                          placeholder="Type a skill and press Enter"
                          className="h-12 rounded-xl border-2 focus:border-cyan-500 transition-colors"
                        />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Press Enter to add each skill. Our AI will suggest relevant skills based on your experience.
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS', 'Docker', 'Git'].map((skill, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-2 px-4 py-2 text-sm bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300 rounded-xl">
                            {skill}
                            <Trash2 className="w-3 h-3 cursor-pointer hover:text-red-500 transition-colors" />
                          </Badge>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="projects" className="space-y-8 mt-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                            <Award className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-2xl font-semibold">Projects</h3>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-xl border-2">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Project
                        </Button>
                      </div>
                      
                      <Card className="border-dashed border-2 border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-800/50">
                        <CardContent className="p-12 text-center">
                          <Award className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                          <h4 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">Showcase Your Projects</h4>
                          <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg">Highlight your best work and achievements</p>
                          <Button className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-8 py-3 rounded-xl">
                            <Plus className="w-5 h-5 mr-2" />
                            Add Project
                          </Button>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Template Selection & AI Tools */}
            <div className="space-y-8">
              {/* Template Selection */}
              <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-xl">Choose Template</CardTitle>
                  <CardDescription>
                    Select a professional template that matches your style
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {templates.map((template) => (
                      <div 
                        key={template.id}
                        className="cursor-pointer group relative border-2 border-gray-200 dark:border-gray-600 hover:border-cyan-500 dark:hover:border-cyan-400 rounded-xl p-4 transition-all duration-300 hover:shadow-lg"
                      >
                        <div className={`aspect-[3/4] bg-gradient-to-br ${template.color} rounded-lg mb-3 flex items-center justify-center shadow-lg`}>
                          <FileText className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-sm font-medium text-center">{template.name}</p>
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Star className="w-4 h-4 text-yellow-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Optimization */}
              <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Brain className="w-5 h-5 mr-2 text-cyan-600" />
                    AI Optimization
                  </CardTitle>
                  <CardDescription>
                    Let AI enhance your resume content for maximum impact
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start h-12 rounded-xl border-2 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 hover:border-cyan-300 transition-all duration-300">
                    <Wand2 className="w-5 h-5 mr-3 text-cyan-600" />
                    Improve Writing
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-12 rounded-xl border-2 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 hover:border-cyan-300 transition-all duration-300">
                    <Target className="w-5 h-5 mr-3 text-cyan-600" />
                    Add Keywords
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-12 rounded-xl border-2 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 transition-all duration-300">
                    <FileText className="w-5 h-5 mr-3 text-green-600" />
                    Check ATS Score
                  </Button>
                </CardContent>
              </Card>

              {/* Progress */}
              <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-xl">Resume Strength</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Overall Score</span>
                      <Badge className="bg-gradient-to-r from-cyan-600 to-cyan-600 text-white px-3 py-1 rounded-full">
                        65%
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div className="bg-gradient-to-r from-cyan-600 to-cyan-600 h-3 rounded-full transition-all duration-500" style={{ width: '65%' }}></div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <span className="text-green-700 dark:text-green-400 font-medium">✓ Contact Information</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <span className="text-orange-700 dark:text-orange-400 font-medium">! Work Experience</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <span className="text-red-700 dark:text-red-400 font-medium">✗ Skills Section</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}