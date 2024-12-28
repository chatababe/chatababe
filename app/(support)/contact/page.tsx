'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFeedback('Message sent successfully.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: 'General Inquiry',
          message: '',
        });
      } else {
        const errorData = await response.json();
        setFeedback(errorData.message || 'Failed to send the message.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setFeedback('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8">
              <div className="grid gap-6">
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6" />
                  <div>
                    <h3 className="font-semibold">Email Support</h3>
                    <p>app.chatubabe@gmail.com</p>
                    <p className="text-sm text-gray-500">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6" />
                  <div>
                    <h3 className="font-semibold">Phone Support</h3>
                    <p>+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500">Mon-Fri, 9AM-5PM EST</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <MessageCircle className="h-6 w-6" />
                  <div>
                    <h3 className="font-semibold">Live Chat</h3>
                    <p>Available on our platform</p>
                    <p className="text-sm text-gray-500">24/7 Support</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Send us a message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                    >
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                      <option>Billing Question</option>
                      <option>Feature Request</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md h-32"
                      placeholder="How can we help you?"
                    />
                  </div>

                  {feedback && <p className="text-sm mt-2">{feedback}</p>}
                </form>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
