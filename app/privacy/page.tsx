import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Metallography.org. Learn how we handle your personal information when you use our website or contact us.',
  alternates: {
    canonical: 'https://metallography.org/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <div className="py-12">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Privacy Policy</h1>
        <p className="text-lg text-gray-600 mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Our Commitment to Your Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At Metallography.org, we are committed to protecting your privacy. We believe in transparency and want you to understand how we handle information when you visit our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Data Collection</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our website is designed to provide free educational resources and guides without requiring any registration or account creation for general browsing. However, we do collect limited personal information when you voluntarily submit it through our contact form.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Specifically, we do not:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Require user registration or account creation to access our content</li>
              <li>Use cookies to track user behavior or preferences</li>
              <li>Share or sell any user data to third parties</li>
              <li>Collect personal information without your explicit consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Contact Form Data</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you submit a message through our contact form, we collect the following information:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Name</strong> (required) - To address you personally in our response</li>
              <li><strong>Email address</strong> (required) - To respond to your inquiry</li>
              <li><strong>Subject</strong> (optional) - To categorize and route your message appropriately</li>
              <li><strong>Message content</strong> (required) - The details of your inquiry or feedback</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>How we use this information:</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>To respond to your inquiry or request</li>
              <li>To provide customer support or technical assistance</li>
              <li>To improve our website and services based on feedback</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Data retention:</strong> We retain contact form submissions only as long as necessary to respond to your inquiry and for a reasonable period thereafter for record-keeping purposes. You may request deletion of your contact information at any time by contacting us.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Data sharing:</strong> We do not share, sell, or rent your contact form information to any third parties. Your information is used solely for the purpose of responding to your inquiry.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Website Analytics</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may use basic website analytics to understand general usage patterns (such as page views and traffic sources) to improve our content and user experience. This information is aggregated and anonymous, and does not identify individual users.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Third-Party Links</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our website may contain links to external websites, including our related sites (shop.metallographic.com, metallographic.com). We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any external websites you visit.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may update this privacy policy from time to time. Any changes will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically to stay informed about how we protect your privacy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this privacy policy, please contact us through our website or visit our contact page.
            </p>
          </section>

          <section className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-3 text-gray-900">Summary</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>In short:</strong> You can browse our website freely without providing any personal information. We only collect personal data (name, email, message) when you voluntarily submit it through our contact form, and we use this information solely to respond to your inquiry. We do not share or sell your data to third parties, and we respect your privacy by not tracking your browsing behavior.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about how we handle your data, please <a href="/contact" className="text-primary-600 hover:text-primary-700 font-medium underline">contact us</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

