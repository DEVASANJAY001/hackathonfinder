import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar onAdminLogin={() => {}} />
      
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                Privacy Policy
              </h1>
              <p className="text-xl text-muted-foreground">
                Your privacy is important to us
              </p>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We collect information you provide directly to us, such as when you create an account, 
                  participate in events, or contact us for support. This may include your name, email address, 
                  and other contact information.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide and maintain our services</li>
                    <li>Process transactions and send related information</li>
                    <li>Send you technical notices and support messages</li>
                    <li>Communicate with you about events, features, and news</li>
                    <li>Monitor and analyze trends and usage</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Information Sharing</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except as described in this policy. We may share information with 
                  trusted service providers who assist us in operating our platform.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction. However, no method of 
                  transmission over the internet is 100% secure.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar technologies to enhance your experience, analyze site usage, 
                  and provide personalized content. You can control cookie settings through your browser.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Your Rights</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Access and update your personal information</li>
                    <li>Request deletion of your account and data</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Request a copy of your data</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at{' '}
                  <a href="mailto:privacy@hackathonhub.com" className="text-primary hover:underline">
                    privacy@hackathonhub.com
                  </a>
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Updates to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes 
                  by posting the new policy on this page and updating the effective date.
                </p>
                <p className="text-sm text-muted-foreground">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;