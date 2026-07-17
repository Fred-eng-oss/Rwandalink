import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword } from '@/lib/password';

export async function POST() {
  try {
    const hashedPassword = hashPassword('SmartLink@2024');

    const admin = await prisma.user.upsert({
      where: { email: 'elysecag@gmail.com' },
      update: { password: hashedPassword },
      create: {
        email: 'elysecag@gmail.com',
        name: 'SmartLink Admin',
        password: hashedPassword,
        role: 'admin',
      },
    });

    const services = [
      { title: 'Website Design & Development', slug: 'website-design-development', description: 'Professional, responsive websites that drive business growth. We create custom web solutions tailored to your brand identity and business goals.', icon: 'Globe', content: 'Our web development team creates stunning, responsive websites that not only look great but also perform exceptionally. From corporate sites to e-commerce platforms, we deliver solutions that help your business stand out online.' },
      { title: 'Custom Business Management Systems', slug: 'custom-business-systems', description: 'Tailored software solutions to streamline your business operations and boost productivity.', icon: 'Server', content: 'We build custom business management systems that automate your workflows, manage your data, and provide actionable insights. Our solutions are designed to scale with your business.' },
      { title: 'Web Hosting', slug: 'web-hosting', description: 'Reliable, secure, and fast web hosting services with 99.9% uptime guarantee.', icon: 'HardDrive', content: 'Our web hosting solutions provide secure, high-performance hosting for your website. With 99.9% uptime guarantee, SSL certificates, and 24/7 support, your site is always in good hands.' },
      { title: 'Professional Business Email Setup', slug: 'business-email-setup', description: 'Professional email addresses that enhance your brand credibility and communication.', icon: 'Mail', content: 'Set up professional business email accounts with your domain name. We configure email systems that work seamlessly across all devices, with spam protection and ample storage.' },
      { title: 'Computer & Laptop Repair', slug: 'computer-laptop-repair', description: 'Expert repair services for all computer and laptop brands with quick turnaround.', icon: 'Wrench', content: 'Our certified technicians provide fast, reliable repair services for all computer and laptop brands. From hardware repairs to software troubleshooting, we handle it all.' },
      { title: 'IT Support & Consulting', slug: 'it-support-consulting', description: 'Strategic IT consulting and ongoing technical support to optimize your technology infrastructure.', icon: 'Briefcase', content: 'Our IT consulting team helps you make informed technology decisions. We assess your current infrastructure, identify improvements, and implement solutions that drive efficiency.' },
      { title: 'Tech Accessories Sales', slug: 'tech-accessories-sales', description: 'Quality computer accessories, peripherals, and tech gadgets at competitive prices.', icon: 'ShoppingBag', content: 'We offer a wide range of quality tech accessories including keyboards, mice, monitors, cables, networking equipment, and more at competitive prices.' },
    ];

    for (const service of services) {
      await prisma.service.upsert({
        where: { slug: service.slug },
        update: service,
        create: service,
      });
    }

    const programs = [
      { title: 'Software Development & Software Engineering', slug: 'software-development-engineering', description: 'Master full-stack software development, from front-end interfaces to back-end systems. Learn industry-standard practices, agile methodologies, version control, and deployment strategies.', duration: '6 months', requirements: 'Basic computer literacy', learningOutcomes: 'Build complete web and desktop applications, write clean code, understand software development lifecycle, deploy and maintain software systems' },
      { title: 'Networking & Internet Technology', slug: 'networking-internet-technology', description: 'Comprehensive networking course covering LAN/WAN infrastructure, TCP/IP protocols, network security, cloud networking, and internet technologies.', duration: '6 months', requirements: 'Basic computer literacy', learningOutcomes: 'Design and configure networks, troubleshoot connectivity issues, implement network security, manage routers and switches' },
      { title: 'Computer System & Architecture', slug: 'computer-system-architecture', description: 'Deep dive into computer hardware, processor architecture, memory management, operating systems, and system administration.', duration: '4 months', requirements: 'Basic computer literacy', learningOutcomes: 'Understand computer architecture, assemble and maintain systems, manage operating systems, diagnose hardware issues' },
      { title: 'Electrical Technology', slug: 'electrical-technology', description: 'Learn electrical systems, circuit design, power distribution, electrical safety standards, and renewable energy fundamentals.', duration: '4 months', requirements: 'Basic computer literacy', learningOutcomes: 'Read and design electrical schematics, install and maintain electrical systems, understand power distribution and safety protocols' },
      { title: 'Electronics & Telecommunication', slug: 'electronics-telecommunication', description: 'Explore electronic circuits, signal processing, wireless communication systems, broadcasting technology, and telecommunications infrastructure.', duration: '6 months', requirements: 'Basic computer literacy', learningOutcomes: 'Design electronic circuits, understand signal processing, work with communication systems, troubleshoot telecom equipment' },
      { title: 'Accounting', slug: 'accounting', description: 'Comprehensive accounting training covering bookkeeping, financial reporting, tax preparation, audit principles, and modern accounting software.', duration: '6 months', requirements: 'Basic computer literacy', learningOutcomes: 'Manage financial records, prepare financial statements, handle tax computations, use accounting software like QuickBooks and Sage' },
      { title: 'Internet of Things & Robotics', slug: 'internet-of-things-robotics', description: 'Explore IoT technologies, sensors, microcontrollers, robotics, automation systems, and connected device programming.', duration: '4 months', requirements: 'Basic programming knowledge recommended', learningOutcomes: 'Build IoT projects, work with sensors and microcontrollers, program robots, understand IoT protocols and automation' },
    ];

    for (const program of programs) {
      await prisma.program.upsert({
        where: { slug: program.slug },
        update: program,
        create: program,
      });
    }

    const testimonials = [
      { name: 'Jean-Pierre Ndayisaba', role: 'CEO', company: 'TechVentures Rwanda', content: 'SmartLink Rwanda transformed our online presence completely. Their team delivered a stunning website that increased our customer engagement by 200%. Highly recommended!', rating: 5, order: 1 },
      { name: 'Marie Claire Uwimana', role: 'Director', company: 'Kigali Business Hub', content: 'The IT training programs at SmartLink are exceptional. Our team gained valuable skills that immediately improved our productivity. Their instructors are knowledgeable and patient.', rating: 5, order: 2 },
      { name: 'Patrick Habimana', role: 'Manager', company: 'Rwanda Digital Solutions', content: 'Professional, reliable, and innovative. SmartLink Rwanda has been our go-to IT partner for over 3 years. Their consulting services have helped us make smarter technology decisions.', rating: 5, order: 3 },
    ];

    for (const testimonial of testimonials) {
      const existing = await prisma.testimonial.findFirst({ where: { name: testimonial.name } });
      if (!existing) {
        await prisma.testimonial.create({ data: testimonial });
      }
    }

    const team = [
      { name: 'Emmanuel Habimana', role: 'Chief Executive Officer', bio: 'Visionary leader with over 15 years of experience in ICT solutions across East Africa.', email: 'emmanuel@smartlinkrw.rw', order: 1 },
      { name: 'Grace Uwimana', role: 'Head of Training', bio: 'Certified IT trainer passionate about empowering Rwanda youth with digital skills.', email: 'grace@smartlinkrw.rw', order: 2 },
      { name: 'David Nkurunziza', role: 'Lead Developer', bio: 'Full-stack developer specializing in modern web technologies and custom business solutions.', email: 'david@smartlinkrw.rw', order: 3 },
    ];

    for (const member of team) {
      const existing = await prisma.teamMember.findFirst({ where: { name: member.name } });
      if (!existing) {
        await prisma.teamMember.create({ data: member });
      }
    }

    const settings = [
      { key: 'company_name', value: 'SmartLink Rwanda' },
      { key: 'company_email', value: 'elysecag@gmail.com' },
      { key: 'company_phone_1', value: '0781899755' },
      { key: 'company_phone_2', value: '0736691969' },
      { key: 'company_address', value: 'Gisozi, Kigali, Rwanda' },
      { key: 'company_description', value: 'SmartLink Rwanda bridges the technology gap in the digital economy through professional IT services, training, certifications, and consultancy.' },
      { key: 'business_hours_weekdays', value: 'Monday - Friday: 8:00 AM - 6:00 PM' },
      { key: 'business_hours_saturday', value: 'Saturday: 9:00 AM - 4:00 PM' },
      { key: 'business_hours_sunday', value: 'Sunday: Closed' },
      { key: 'social_facebook', value: '#' },
      { key: 'social_twitter', value: '#' },
      { key: 'social_linkedin', value: '#' },
      { key: 'social_instagram', value: '#' },
    ];

    for (const setting of settings) {
      await prisma.setting.upsert({
        where: { key: setting.key },
        update: { value: setting.value },
        create: setting,
      });
    }

    return NextResponse.json({
      message: 'Database seeded successfully',
      counts: {
        services: services.length,
        programs: programs.length,
        testimonials: testimonials.length,
        teamMembers: team.length,
        settings: settings.length,
      },
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}
