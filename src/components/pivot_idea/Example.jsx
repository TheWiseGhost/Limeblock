"use client";

import React, { useState } from "react";
import {
  MapPin,
  Target,
  DollarSign,
  Calendar,
  CheckCircle,
  Phone,
  CreditCard,
  Clock,
  Package,
  Truck,
  Users,
  TrendingUp,
  FileText,
  Mail,
  ArrowRight,
  Info,
  HelpCircle,
  ShieldCheck,
  Lock,
  ClipboardCheck,
  Repeat,
} from "lucide-react";

export default function Example() {
  const [selectedPayment, setSelectedPayment] = useState("full");
  const [isBookingMeeting, setIsBookingMeeting] = useState(false);

  const costBreakdown = [
    {
      title: "Custom Donut Box Design & Production",
      description: "Premium branded boxes with your logo, 50 units",
      cost: 400,
    },
    {
      title: "Artisanal Donuts (6 per box)",
      description: "Fresh donuts from local SF bakeries, 300 total donuts",
      cost: 600,
    },
    {
      title: "Targeted Delivery Service",
      description: "Premium delivery to 50 high-value locations",
      cost: 500,
    },
    {
      title: "High-Value Target List Curation",
      description: "Research and verification of 50 top-tier companies",
      cost: 100,
    },
    {
      title: "Custom Branded Materials",
      description: "Personalized cards, QR codes, and premium inserts",
      cost: 100,
    },
    {
      title: "Campaign Management & Analytics",
      description: "Real-time tracking, reporting, and engagement metrics",
      cost: 200,
    },
    {
      title: "Fulfillment & Coordination",
      description: "Logistics coordination and delivery orchestration",
      cost: 400,
    },
  ];

  const exampleCompanies = [
    {
      name: "Cluely",
      neighborhood: "Financial District",
      url: "https://cluely.com",
    },
    {
      name: "Origami",
      neighborhood: "SOMA",
      url: "https://origami.com",
    },
    {
      name: "Delve",
      neighborhood: "Mission Bay",
      url: "https://delve.com",
    },
  ];

  const deliveryNeighborhoods = [
    "Financial District",
    "SOMA",
    "Mission Bay",
    "South Beach",
    "Jackson Square",
    "Transbay",
    "North Beach",
  ];

  const totalCost = costBreakdown.reduce((sum, item) => sum + item.cost, 0);

  const handleBookMeeting = () => {
    setIsBookingMeeting(true);
    setTimeout(() => {
      setIsBookingMeeting(false);
      alert(
        "Meeting request sent! You'll receive a calendar link within 30 minutes."
      );
    }, 2000);
  };

  const handlePayment = () => {
    alert(
      `Payment initiated for $${totalCost.toLocaleString()}. You'll be redirected to our secure payment portal.`
    );
  };

  return (
    <div className="min-h-screen bg-white text-black font-inter overflow-hidden pb-10">
      {/* Header */}
      <section className="px-8 pt-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-aeonik mb-4 bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text pb-3 text-transparent font-medium">
              Custom Donut Box Campaign
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Branded donut delivery to targeted San Francisco startups
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>Launch: 1-2 weeks</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target size={16} />
                <span>50 deliveries</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>San Francisco</span>
              </div>
            </div>
          </div>

          {/* Campaign Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              <div className="border-2 border-gray-800 p-8">
                <h2 className="text-2xl font-medium mb-6 flex items-center">
                  <Target className="mr-3" size={24} />
                  Campaign Overview
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Our targeted donut box campaign will deliver premium,
                    branded donuts to 50 carefully selected high-value tech
                    companies and startups across San Francisco. Each delivery
                    includes 6 artisanal donuts in a custom-designed box
                    featuring your company branding.
                  </p>
                  <p>
                    This focused campaign targets decision-makers at the most
                    promising companies, creating memorable touchpoints that
                    drive brand awareness and meaningful business conversations
                    within your $5,000 budget.
                  </p>
                </div>
              </div>

              <div className="border-2 border-gray-800 p-8">
                <h2 className="text-2xl font-medium mb-6 flex items-center">
                  <Users className="mr-3" size={24} />
                  Target Audience
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">High-Growth Startups (50%)</p>
                      <p className="text-sm text-gray-600">
                        Series A-B companies with strong funding and growth
                        potential that need your company to continue growing
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">
                        Mid-Market Tech Companies (30%)
                      </p>
                      <p className="text-sm text-gray-600">
                        Established companies with decision-making authority
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">
                        Premium Creative Agencies (20%)
                      </p>
                      <p className="text-sm text-gray-600">
                        Top-tier agencies with high-value client relationships
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="border-2 border-gray-800 p-8">
                <h2 className="text-2xl font-medium mb-6 flex items-center">
                  <Package className="mr-3" size={24} />
                  Delivery Strategy
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Deliveries will be scheduled between 9:00 AM - 11:00 AM on
                    weekdays to maximize office presence and team engagement.
                    Our focused approach targets key neighborhoods including
                    SOMA, Mission Bay, and Financial District where the
                    highest-value companies are located.
                  </p>
                  <p>
                    Each delivery includes a personalized note and QR code
                    linking to your campaign landing page for tracking
                    engagement and follow-up opportunities. We'll prioritize
                    companies with the highest potential ROI for your business.
                  </p>
                </div>
              </div>

              <div className="border-2 border-gray-800 p-8">
                <h2 className="text-2xl font-medium mb-6 flex items-center">
                  <TrendingUp className="mr-3" size={24} />
                  Expected Results
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Successful Deliveries</span>
                    <span className="font-medium">~96% (48 offices)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">QR Code Engagement</span>
                    <span className="font-medium">~80% (40 scans)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Social Media Mentions</span>
                    <span className="font-medium">~12 posts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">
                      Content you make about this
                    </span>
                    <span className="font-medium">~6 posts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Estimated Reach</span>
                    <span className="font-medium">50,000+ people</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Timeline */}
          <div className="mb-16">
            <h2 className="text-3xl font-medium mb-8 text-center">
              Campaign Timeline
            </h2>
            <div className="border-2 border-gray-800 p-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 mt-2 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">
                      Days 1-3: Setup & Design
                    </h3>
                    <p className="text-gray-600">
                      Box design finalization, target list curation, vendor
                      coordination
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 mt-2 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">
                      Days 4-7: Production & Testing
                    </h3>
                    <p className="text-gray-600">
                      Small batch production, quality testing, delivery route
                      planning
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 mt-2 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">
                      Days 8-10: Campaign Launch
                    </h3>
                    <p className="text-gray-600">
                      Full campaign execution over 2-3 days with real-time
                      tracking
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Strategy */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              <div className="border-2 border-gray-800 p-8">
                <h2 className="text-2xl font-medium mb-6 flex items-center">
                  <Package className="mr-3" size={24} />
                  Partner Bakeries
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Johnny Doughnuts</p>
                      <p className="text-sm text-gray-600">
                        Artisanal donuts with unique flavors - Mission District
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Dynamo Donut + Coffee</p>
                      <p className="text-sm text-gray-600">
                        Gourmet donuts with local ingredients - Castro
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Devil's Teeth Baking Co.</p>
                      <p className="text-sm text-gray-600">
                        Handcrafted donuts and pastries - Sunset District
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Donut Savant</p>
                      <p className="text-sm text-gray-600">
                        Creative flavors and premium ingredients - Mission Bay
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-2 border-gray-800 p-8">
              <h2 className="text-2xl font-medium mb-4 flex items-center">
                <Users className="mr-3" size={24} />
                Example Target Companies
              </h2>
              <div className="space-y-3">
                {exampleCompanies.map((company, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 hover:bg-gray-50"
                  >
                    <div>
                      <a
                        href={company.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium"
                      >
                        {company.name}
                      </a>
                      <p className="text-sm text-gray-600">
                        {company.neighborhood}
                      </p>
                    </div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <span className="underline cursor-pointer">See full list</span>{" "}
                we built or{" "}
                <span className="underline cursor-pointer">call us</span> to
                make your own
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="mb-16">
            <h2 className="text-3xl font-medium mb-8 text-center">
              Investment Breakdown
            </h2>
            <div className="border-2 border-gray-800 p-8">
              <div className="space-y-6">
                {costBreakdown.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-4 bg-gray-50 border-l-4 border-black"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{item.title}</h3>
                      <p className="text-gray-600 text-sm">
                        {item.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-medium">
                        ${item.cost.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="border-t-2 border-gray-800 pt-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-medium">Total Investment</h3>
                    <p className="text-3xl font-medium">
                      ${totalCost.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust & Security Section */}
          <div className="border-2 border-gray-800 p-8 mb-16">
            <h2 className="text-3xl font-medium mb-8 text-center flex items-center justify-center">
              <ShieldCheck className="mr-3" size={28} />
              Secure & Trusted Process
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 border-l-4 border-black">
                <div className="flex items-center mb-3">
                  <Lock size={20} className="mr-2" />
                  <h3 className="font-medium text-lg">Payment Security</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  All payments processed through PCI-compliant systems with
                  256-bit encryption. We never store your full payment details.
                </p>
              </div>

              <div className="bg-gray-50 p-6 border-l-4 border-black">
                <div className="flex items-center mb-3">
                  <ClipboardCheck size={20} className="mr-2" />
                  <h3 className="font-medium text-lg">
                    Satisfaction Guarantee
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">
                  If we fail to deliver to at least 90% of targets, you'll
                  receive a 50% refund or complimentary re-delivery.
                </p>
              </div>

              <div className="bg-gray-50 p-6 border-l-4 border-black">
                <div className="flex items-center mb-3">
                  <Repeat size={20} className="mr-2" />
                  <h3 className="font-medium text-lg">Cancellation Policy</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Full refund if canceled before production begins (within 48
                  hours). 50% refund if canceled within first 5 days.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="border-2 border-gray-800 p-8 mb-16">
            <h2 className="text-3xl font-medium mb-8 text-center flex items-center justify-center">
              <HelpCircle className="mr-3" size={28} />
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {[
                {
                  question: "How do you ensure delivery to the right people?",
                  answer:
                    "We work directly with office managers and reception at target companies. Each delivery includes specific recipient instructions and we follow up with confirmation photos.",
                },
                {
                  question: "Can I provide my own donut supplier?",
                  answer:
                    "Yes! We work with any local bakery in SF. Additional coordination fees may apply if outside our partner network.",
                },
                {
                  question: "What if a company refuses delivery?",
                  answer:
                    "We have backup targets ready and will either substitute or refund the undeliverable portion (typically <4% of campaigns).",
                },
                {
                  question: "How are engagement metrics tracked?",
                  answer:
                    "Each box includes a unique QR code that tracks scans. We also monitor social mentions and provide UTM-tagged links for your follow-up.",
                },
                {
                  question: "Can I see the full target list before launch?",
                  answer:
                    "Absolutely. You'll receive the complete target list for approval 72 hours before delivery begins.",
                },
              ].map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <h3 className="font-medium text-lg flex items-center">
                    <Info className="mr-3 text-gray-500" size={20} />
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 mt-2 pl-8">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Map Section */}
          <div className="border-2 border-gray-800 p-8 mb-16">
            <h2 className="text-3xl font-medium mb-8 text-center flex items-center justify-center">
              <MapPin className="mr-3" size={28} />
              Delivery Coverage Map
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 border-l-4 border-black">
                  <h3 className="font-medium text-lg mb-4 flex items-center">
                    <Truck className="mr-2" size={20} />
                    Focused Delivery Zones
                  </h3>
                  <p className="text-gray-700 mb-4">
                    We concentrate our delivery efforts in San Francisco's most
                    valuable tech corridors where target density is highest.
                    This ensures maximum impact for your campaign budget.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-medium">Primary Neighborhoods:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {deliveryNeighborhoods.map((neighborhood, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
                          <span className="text-sm">{neighborhood}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 border-l-4 border-black">
                  <h3 className="font-medium text-lg mb-4 flex items-center">
                    <Clock className="mr-2" size={20} />
                    Delivery Strategy
                  </h3>
                  <div className="text-sm text-gray-600 space-y-3">
                    <p>
                      <span className="font-medium">Morning Focus:</span>
                      Deliveries occur between 9-11am to ensure office presence
                    </p>
                    <p>
                      <span className="font-medium">Route Optimization:</span>
                      Efficient clustering of targets to maximize freshness
                    </p>
                    <p>
                      <span className="font-medium">Real-time Tracking:</span>
                      Live updates with photos and recipient confirmations
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="border-2 border-gray-800 h-full overflow-hidden">
                  <img
                    src="https://content.sfstandard.com/wp-content/uploads/2023/11/screenshot-2023-11-11-at-11-06-36-am.png?w=1334"
                    alt="San Francisco delivery coverage map"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4 text-center text-sm text-gray-600">
                  <p>
                    Our delivery radius covers 92% of San Francisco's tech
                    companies
                  </p>
                  <p className="mt-1">
                    Concentrated in high-value corridors for maximum impact
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contract Section */}
          <div className="border-2 border-gray-800 p-8">
            <h2 className="text-3xl font-medium mb-8 text-center">
              Ready to Launch?
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 border-l-4 border-black">
                  <h3 className="font-medium text-lg mb-4 flex items-center">
                    <Clock className="mr-2" size={20} />
                    Expected Launch Timeline
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Once you approve this plan, we'll begin immediately with a
                    projected campaign launch in 1-2 weeks.
                  </p>
                  <div className="text-sm text-gray-600">
                    <p>• Contract signed: Within 24 hours</p>
                    <p>• Production begins: Within 48 hours</p>
                    <p>• Campaign launch: 1-2 weeks from approval</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 border-l-4 border-black">
                  <h3 className="font-medium text-lg mb-4 flex items-center">
                    <CheckCircle className="mr-2" size={20} />
                    What's Included
                  </h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• Daily delivery reports and tracking</p>
                    <p>• Real-time campaign analytics</p>
                    <p>• Post-campaign performance analysis</p>
                    <p>• High-resolution photos of each delivery</p>
                    <p>• 14-day support and follow-up assistance</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-6 border-l-4 border-black">
                  <h3 className="font-medium text-lg mb-4">
                    Choose Your Next Step
                  </h3>

                  <div className="space-y-4">
                    <button
                      onClick={handleBookMeeting}
                      disabled={isBookingMeeting}
                      className="w-full bg-white text-black border-2 border-black py-3 px-6 text-sm font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group disabled:opacity-50"
                    >
                      <span className="inline-flex items-center justify-center space-x-2">
                        <Phone size={16} />
                        <span>
                          {isBookingMeeting
                            ? "Booking..."
                            : "Book Strategy Call"}
                        </span>
                        <ArrowRight
                          size={16}
                          className="transform transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </button>

                    <div className="text-center text-sm text-gray-500">or</div>

                    <button
                      onClick={handlePayment}
                      className="w-full bg-black text-white py-3 px-6 text-sm font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group"
                    >
                      <span className="inline-flex items-center justify-center space-x-2">
                        <CreditCard size={16} />
                        <span>Approve & Pay Now</span>
                        <ArrowRight
                          size={16}
                          className="transform transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 border-l-4 border-black">
                  <h3 className="font-medium text-lg mb-4">Payment Options</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        value="full"
                        checked={selectedPayment === "full"}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="w-4 h-4 accent-lime"
                      />
                      <span className="text-sm">
                        Full payment: ${totalCost.toLocaleString()} (Save 3%)
                      </span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        value="split"
                        checked={selectedPayment === "split"}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="w-4 h-4 accent-lime"
                      />
                      <span className="text-sm">
                        50% now, 50% before launch
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
              Questions? Email us at aditya@limeblock.com
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
