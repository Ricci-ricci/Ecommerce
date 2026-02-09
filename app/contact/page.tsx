"use client";

import { useState } from "react";
import Container from "@/app/layout/container";
import Section from "@/app/layout/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Send } from "lucide-react";

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here (e.g., send to API)
        console.log("Form submitted:", formData);
        // Reset form
        setFormData({ name: "", email: "", message: "" });
        alert("Thank you for your message! We'll get back to you soon.");
    };

    return (
        <Container>
            <Section>
                <div className="max-w-4xl mx-auto py-12">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Contact Us
                        </h1>
                        <p className="text-lg text-gray-600">
                            We'd love to hear from you. Send us a message and
                            we'll respond as soon as possible.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                                Send us a Message
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Full Name
                                    </label>
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full"
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Email Address
                                    </label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Message
                                    </label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="w-full"
                                        placeholder="Tell us how we can help you..."
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                                >
                                    <Send className="w-4 h-4 mr-2" />
                                    Send Message
                                </Button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                                    Get in Touch
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <MapPin className="w-6 h-6 text-red-600 mt-1" />
                                        <div>
                                            <h3 className="font-medium text-gray-900">
                                                Address
                                            </h3>
                                            <p className="text-gray-600">
                                                123 Spider Street
                                                <br />
                                                Web City, WC 12345
                                                <br />
                                                United States
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Phone className="w-6 h-6 text-red-600" />
                                        <div>
                                            <h3 className="font-medium text-gray-900">
                                                Phone
                                            </h3>
                                            <p className="text-gray-600">
                                                +1 (555) 123-4567
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Mail className="w-6 h-6 text-red-600" />
                                        <div>
                                            <h3 className="font-medium text-gray-900">
                                                Email
                                            </h3>
                                            <p className="text-gray-600">
                                                hello@spidersense.com
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Business Hours
                                </h3>
                                <div className="space-y-1 text-gray-600">
                                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                                    <p>Sunday: Closed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </Container>
    );
};

export default ContactPage;
