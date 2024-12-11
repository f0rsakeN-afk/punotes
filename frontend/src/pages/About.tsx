import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Check } from "lucide-react";
import nishant from "../assets/nishant.jpeg";
import naresh from "../assets/naresh.jpg";
import pushkar from "../assets/pushkar.jpeg";
import rakesh from '../assets/rakesh.jpeg'

interface TeamMember {
    name: string;
    role: string;
    image: string;
    linkedin?: string;
}

const teamMembers: TeamMember[] = [
    {
        name: "Nishant Bishwakarma",
        role: "CEO",
        image: nishant,
        linkedin: "https://www.linkedin.com/in/nishant-bishwakarma-4631222b9/",
    },
    {
        name: "Pushkar Khawas",
        role: "Technical Lead",
        image: pushkar,
        linkedin: "https://www.linkedin.com/in/pushkar-khawas-22256830a/",
    },
    {
        name: "Naresh Rajbanshi",
        role: "Developer",
        image: naresh,
        linkedin: "https://www.linkedin.com/in/f0rsaken/",
    },
    {
        name: "Rakesh Ray",
        role: "Python Developer",
        image: rakesh,
        linkedin: "https://www.linkedin.com/in/rakesh-ray-001364341/",
    },

];

const About: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
            <div className="container mx-auto max-w-7xl py-16 px-4 space-y-20">
                {/* Hero Section */}
                <section className="text-center space-y-6">
                    <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        About PU Notes
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Your comprehensive resource for engineering study materials at
                        Purbanchal University
                    </p>
                </section>

                {/* Mission Section */}
                <section className="grid md:grid-cols-2 gap-8">
                    <Card className="transition-all duration-300  hover:shadow-xl">
                        <CardHeader>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                Our Mission
                            </h2>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground leading-relaxed">
                                We strive to make quality education accessible to all
                                engineering students by providing a centralized platform for
                                study materials, notes, and resources. Our goal is to help
                                students excel in their academic journey.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="transition-all duration-300  hover:shadow-xl">
                        <CardHeader>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                What We Offer
                            </h2>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 text-muted-foreground">
                                {[
                                    "Comprehensive study materials for all semesters",
                                    "Branch-specific resources and notes",
                                    "Past examination papers",
                                    "Regularly updated content",
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-2">
                                        <Check className="h-5 w-5 text-primary" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </section>

                {/* Team Section */}
                <section className="space-y-8">
                    <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Meet Our Team
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member) => (
                            <Card
                                key={member.name}
                                className="transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group"
                            >
                                <CardContent className="text-center p-6 space-y-4">
                                    <div className="w-32 h-32 rounded-full bg-muted mx-auto overflow-hidden ring-2 ring-primary/20 hover:ring-blue-500 ring-offset-2 transition-all ease-linear">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{member.name}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {member.role}
                                        </p>
                                    </div>
                                    {member.linkedin && (
                                        <Button variant="outline" size="sm" asChild>
                                            <a
                                                href={member.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Connect on LinkedIn
                                            </a>
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Contact Section */}
                <section>
                    <Card className="transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-primary/5">
                        <CardContent className="text-center p-12 space-y-6">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                Get in Touch
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Have questions or suggestions? We'd love to hear from you! Reach
                                out to us anytime.
                            </p>
                            <div className="flex justify-center gap-4">
                                <Button size="lg" className="gap-2">
                                    <Mail className="h-5 w-5" />
                                    <a href="mailto:contact@punotes.com">Contact Us</a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    );
};

export default About;
