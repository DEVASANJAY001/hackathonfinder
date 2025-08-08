import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar onAdminLogin={() => {}} />
      
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                Terms and Conditions
              </h1>
              <p className="text-xl text-muted-foreground">
                Please read these terms carefully
              </p>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using this platform, you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, 
                  please do not use this service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Use License</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>Permission is granted to temporarily use this platform for personal, non-commercial 
                     transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or for any public display</li>
                    <li>Attempt to reverse engineer any software contained on the platform</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">User Accounts</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>When you create an account with us, you must provide information that is accurate, 
                     complete, and current at all times. You are responsible for:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Safeguarding the password and all activities under your account</li>
                    <li>Notifying us immediately of any unauthorized use of your account</li>
                    <li>Ensuring your account information remains accurate and up-to-date</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Prohibited Uses</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>You may not use our platform:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                    <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                    <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                    <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                    <li>To submit false or misleading information</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Content</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our platform allows you to view and interact with content. You understand that by using 
                  our platform, you may be exposed to content that you may find offensive, indecent, 
                  or objectionable. We reserve the right to remove or modify content at our sole discretion.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may terminate or suspend your account and bar access to the platform immediately, 
                  without prior notice or liability, under our sole discretion, for any reason whatsoever 
                  and without limitation, including but not limited to a breach of the Terms.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The information on this platform is provided on an 'as is' basis. To the fullest extent 
                  permitted by law, this Company excludes all representations, warranties, conditions and 
                  terms relating to our platform and the use of this platform.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  In no event shall our company or its suppliers be liable for any damages arising out 
                  of the use or inability to use the materials on this platform, even if authorized 
                  representatives have been notified orally or in writing of the possibility of such damage.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms and Conditions, please contact us at{' '}
                  <a href="mailto:legal@hackathonhub.com" className="text-primary hover:underline">
                    legal@hackathonhub.com
                  </a>
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to revise these terms at any time without notice. 
                  By using this platform, you are agreeing to be bound by the current version of these Terms and Conditions.
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

export default Terms;