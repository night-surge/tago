import React from "react";
import Link from "next/link";
import Footer from '@/components/Footer';
import ScrollNavWrapper from '@/components/ScrollNavWrapper';
import Navbar from '@/components/Navbar';
import { Smartphone, CheckCircle, Zap } from "lucide-react";

const Working = () => {
  return (
    <div>
      <ScrollNavWrapper>
          <Navbar />
        </ScrollNavWrapper>
    <div className="min-h-screen bg-zinc-900 text-white">
      
      {/* Hero Section */}
      <div className="py-28 pb-20 px-4 bg-gradient-to-r from-zinc-900 to-black relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-zinc-700/5 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs bg-zinc-800 text-white mb-4">
            HOW IT WORKS
          </span>
          <h1 className="text-2xl md:text-4xl font-bold mb-6">
            Using Your Tago Card
          </h1>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
            Share your contact information, social profiles, and more with a
            simple tap. Here&apos;s how to ensure your Tago card works perfectly with
            any smartphone.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Intro */}
        <div className="mb-16 text-center">
          <div className="flex justify-center mb-8">
            <Zap size={48} className="text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            One Tap Connection
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Tago cards work with most modern smartphones. Simply ensure NFC is
            enabled on the receiving device, then tap your card to instantly
            share your information.
          </p>
        </div>

        {/* Android Section */}
        <div className="mb-20">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center">
                <Smartphone className="text-white" size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Android Devices
              </h2>
            </div>

            <p className="text-zinc-400 mb-8">
              Android devices require NFC to be manually enabled. Follow these
              simple steps to turn on NFC on your Android smartphone:
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Open Settings</h3>
                  <p className="text-zinc-400">
                    Navigate to your phone&apos;s Settings menu by swiping down from
                    the top of your screen and tapping the gear icon.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Find Connection Settings
                  </h3>
                  <p className="text-zinc-400">
                    Look for &quot;Connections,&quot; &quot;Connected devices,&quot; or &quot;Network &
                    Internet&quot; (varies by brand).
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Enable NFC</h3>
                  <p className="text-zinc-400">
                    Find &quot;NFC&quot; or &quot;NFC and payment&quot; and toggle the switch to the
                    ON position.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Tap to Connect</h3>
                  <p className="text-zinc-400">
                    Touch your Tago card to the back of your phone, usually near
                    the camera or center of the device.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* iOS Section */}
        <div className="mb-14">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center">
                <Smartphone className="text-white" size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">iOS Devices</h2>
            </div>

            <p className="text-zinc-400 mb-8">
              For iPhone users (iPhone 6 and newer), NFC is enabled by default
              and always ready to use with your Tago card:
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="text-white" size={16} />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Always On</h3>
                  <p className="text-zinc-400">
                    NFC reading capability is always enabled on compatible
                    iPhones (iPhone 7 and newer).
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="text-white" size={16} />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    No Settings Required
                  </h3>
                  <p className="text-zinc-400">
                    You don&apos;t need to adjust any settings to use your Tago card
                    with an iPhone.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="text-white" size={16} />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Tap to Connect</h3>
                  <p className="text-zinc-400">
                    Simply tap your Tago card against the top portion of your
                    iPhone (near the camera).
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="text-white" size={16} />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Instant Notification
                  </h3>
                  <p className="text-zinc-400">
                    A notification will appear with your Tago profile
                    information ready to save.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        
      </div>
      <div className="relative mb- w-screen py-16 px-4 bg-gradient-to-r from-zinc-900  to-black  overflow-hidden">
          <div className="absolute -top-40 -left-40 -right-40 w-80 h-80 bg-zinc-700/5 rounded-full blur-3xl"></div>

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Ready to Transform Your Networking?
            </h2>
            <p className="text-zinc-400 mb-8">
              Join the future of professional connections with Tago&apos;s premium
              NFC cards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <button className="px-8 py-4 rounded-full bg-white text-black hover:bg-zinc-200 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                  Order Your Card
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-4 rounded-full bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 transform hover:scale-105 border border-zinc-700 w-full sm:w-auto">
                  Contact Support
                </button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
    </div>
    </div>
  );
};

export default Working;
