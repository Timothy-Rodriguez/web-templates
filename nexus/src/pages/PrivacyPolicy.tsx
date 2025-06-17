import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Separator } from "../components/ui/separator"
import { Shield, Eye, Cookie, Mail, Lock, UserCheck } from "lucide-react"

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-4">
      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-gray-500 mt-2">Last updated: December 1, 2023</p>
        </div>

        <div className="space-y-8">
          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-600" />
                Information We Collect
              </CardTitle>
              <CardDescription>We collect information to provide better services to our users.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <p className="text-gray-600 mb-2">
                  When you create an account or interact with our services, we may collect:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>Name and email address</li>
                  <li>Profile information and preferences</li>
                  <li>Comments and content you create</li>
                  <li>Communication preferences</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Usage Information</h3>
                <p className="text-gray-600 mb-2">
                  We automatically collect information about how you use our services:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>Pages visited and time spent on our site</li>
                  <li>Articles read and interactions</li>
                  <li>Device information and browser type</li>
                  <li>IP address and location data</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-green-600" />
                How We Use Your Information
              </CardTitle>
              <CardDescription>We use your information to improve our services and your experience.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="font-semibold">Service Provision</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                    <li>Provide and maintain our services</li>
                    <li>Personalize content recommendations</li>
                    <li>Enable user interactions and comments</li>
                    <li>Process account registrations</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold">Communication</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                    <li>Send important service updates</li>
                    <li>Respond to your inquiries</li>
                    <li>Send newsletters (with consent)</li>
                    <li>Notify about new features</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold">Analytics</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                    <li>Analyze usage patterns</li>
                    <li>Improve our services</li>
                    <li>Generate insights and reports</li>
                    <li>Monitor performance</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold">Security</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                    <li>Protect against fraud</li>
                    <li>Ensure platform security</li>
                    <li>Comply with legal requirements</li>
                    <li>Enforce our terms of service</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookies and Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="h-5 w-5 text-orange-600" />
                Cookies and Tracking
              </CardTitle>
              <CardDescription>How we use cookies and similar technologies.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                We use cookies and similar technologies to enhance your experience, analyze usage, and provide
                personalized content.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Essential Cookies</h4>
                  <p className="text-sm text-gray-600">Required for basic site functionality and security.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Analytics Cookies</h4>
                  <p className="text-sm text-gray-600">Help us understand how visitors interact with our site.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Preference Cookies</h4>
                  <p className="text-sm text-gray-600">Remember your settings and personalize your experience.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-red-600" />
                Data Security
              </CardTitle>
              <CardDescription>How we protect your information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                We implement appropriate technical and organizational measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Technical Measures</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                    <li>SSL/TLS encryption for data transmission</li>
                    <li>Secure data storage with encryption at rest</li>
                    <li>Regular security audits and updates</li>
                    <li>Access controls and authentication</li>
                    <li>Firewall and intrusion detection systems</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Organizational Measures</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                    <li>Employee training on data protection</li>
                    <li>Limited access on a need-to-know basis</li>
                    <li>Regular privacy impact assessments</li>
                    <li>Incident response procedures</li>
                    <li>Third-party vendor security requirements</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-purple-600" />
                Your Rights
              </CardTitle>
              <CardDescription>You have certain rights regarding your personal information.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Access</h4>
                    <p className="text-sm text-gray-600">Request a copy of your personal data we hold.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Correction</h4>
                    <p className="text-sm text-gray-600">Request correction of inaccurate personal data.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Deletion</h4>
                    <p className="text-sm text-gray-600">Request deletion of your personal data.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Portability</h4>
                    <p className="text-sm text-gray-600">Request transfer of your data to another service.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Objection</h4>
                    <p className="text-sm text-gray-600">Object to processing of your personal data.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Restriction</h4>
                    <p className="text-sm text-gray-600">Request restriction of processing your data.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" />
                Contact Us
              </CardTitle>
              <CardDescription>Questions about this privacy policy or your data.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Email</h4>
                    <p className="text-gray-600">privacy@nexusblog.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Address</h4>
                    <p className="text-gray-600">
                      123 Privacy Street
                      <br />
                      Data City, DC 12345
                      <br />
                      United States
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Response Time:</strong> We aim to respond to all privacy-related inquiries within 30 days.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
