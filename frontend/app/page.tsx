'use client';

import Header from '@/components/header';
import { Button } from '@/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card';
import { Badge } from '@/components/badge';
import { 
  FileText, 
  MessageCircle, 
  Zap, 
  Shield, 
  Star,
  ChevronRight,
  CheckCircle,
  Sparkles,
  Brain,
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/20">
      <Header />
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Career Platform
            </Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              Build Your Dream Career with{' '}
              <span className="gradient-text">AI Precision</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Meet our advanced AI agent, designed to provide you with personalized career guidance and create stunning resumes in no time. Powered by cutting-edge technology, it transforms your professional journey in minutes, not hours
            </p>
            <Link href="/chat" className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                Chat with Agent
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center group">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-2">50K+</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">Resumes Created</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-2">98%</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">Success Rate</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-2">24/7</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">AI Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to <span className="gradient-text">Succeed</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our comprehensive platform provides cutting-edge tools to build, optimize, and perfect your career journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Resume Builder */}
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-purple-50/50 dark:from-gray-800 dark:to-purple-900/20 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="text-center pb-6 relative">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <FileText className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-3xl mb-4 font-bold">Smart Resume Builder</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  Create ATS-optimized resumes with AI-powered suggestions tailored to your industry and experience level.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center relative">
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-3 mb-8">
                  <li className="flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Professional templates with modern designs
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Real-time AI optimization and suggestions
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Export in multiple formats (PDF, Word, etc.)
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    ATS compatibility scoring
                  </li>
                </ul>
                <Link href="/resume-builder">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-xl group-hover:shadow-lg transition-all duration-300">
                    Start Building
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* AI Assistant */}
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-cyan-50/50 dark:from-gray-800 dark:to-cyan-900/20 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="text-center pb-6 relative">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-3xl mb-4 font-bold">AI Career Assistant</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  Get personalized career advice, interview prep, and professional guidance from our intelligent AI assistant.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center relative">
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-3 mb-8">
                  <li className="flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    24/7 personalized career guidance
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Interview preparation and practice
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Skill development recommendations
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Industry insights and trends
                  </li>
                </ul>
                <Link href="/chat">
                  <Button className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white font-semibold py-3 rounded-xl group-hover:shadow-lg transition-all duration-300">
                    Chat Now
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-600 via-purple-700 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose Career Agent?
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Join thousands of professionals who have accelerated their careers with our cutting-edge platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Lightning Fast</h3>
              <p className="text-purple-100 leading-relaxed">
                Create professional resumes in minutes with our AI-powered automation. No more hours of formatting and tweaking.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">AI-Powered Intelligence</h3>
              <p className="text-purple-100 leading-relaxed">
                Our advanced AI analyzes industry trends and requirements to optimize your resume for maximum impact.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Trusted & Secure</h3>
              <p className="text-purple-100 leading-relaxed">
                Your data is protected with enterprise-grade security. Privacy and confidentiality guaranteed at all times.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Loved by <span className="gradient-text">Professionals</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              See what our users have to say about their career transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Software Engineer",
                company: "Tech Corp",
                rating: 5,
                text: "Career Agents's AI completely transformed my resume. I landed my dream job at a top tech company within weeks!"
              },
              {
                name: "Michael Chen",
                role: "Marketing Manager",
                company: "StartupXYZ",
                rating: 5,
                text: "The AI assistant provided incredible insights for my career transition. The guidance was spot-on and personalized."
              },
              {
                name: "Emily Davis",
                role: "Product Designer",
                company: "Design Studio",
                rating: 5,
                text: "The resume builder is intuitive and powerful. The AI suggestions helped me highlight skills I didn't even know were valuable."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
                <CardContent className="p-8">
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 italic text-lg leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-4">
                      <div className="font-semibold text-lg">{testimonial.name}</div>
                      <div className="text-gray-500 dark:text-gray-400">{testimonial.role} at {testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
            Join thousands of professionals who are already using Career Agent to advance their careers with AI precision.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/resume-builder">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                Start Free Trial
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg" className="px-10 py-4 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300">
                View Pricing Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}