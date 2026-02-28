import { Helmet } from "react-helmet-async";
import ContactForm from "../component/ContactForm";
import { useState } from "react";

export default function ContactPage() {

  const [isContactFormShown, setIsContactFormShown] = useState<boolean>(false);
  const [isMessageSentSuccessfully, setIsMessageSentSuccessfully] = useState<boolean>(false)

  return (
    <>
      <Helmet>
        <title>DO Share | Contact</title>
        <meta name="description" content="Quickly upload and transfer files with ease using our temporary file sharing service. Secure and simple, share files and text via a unique link. Only those with the link can access your uploaded information. Perfect for colleagues, friends, and clients." />
      </Helmet>

      <div className="relative">
        <div className="py-4 flex flex-col gap-6 max-w-4xl m-auto">
          <div className="bg-gradient-to-br from-white via-indigo-50/30 to-cyan-50/50 dark:from-slate-900 dark:via-indigo-900/30 dark:to-cyan-900/50 rounded-2xl shadow-xl shadow-indigo-500/10 dark:shadow-indigo-950/50 border border-indigo-200/30 dark:border-slate-700 backdrop-blur-sm p-6 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent mb-5">
              Contact Us
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-base mb-5 max-w-2xl mx-auto">
              Our file transfer service is incredibly useful in today's digital world. It provides an efficient way to share information, especially when dealing with large files that cannot be sent via email.
            </p>

            <div className="p-4 bg-gradient-to-r from-indigo-50/50 via-purple-50/50 to-cyan-50/50 dark:from-indigo-900/50 dark:via-purple-900/50 dark:to-cyan-900/50 rounded-xl border border-indigo-200/30 dark:border-slate-700 mb-5">
              <p className="font-semibold text-slate-700 dark:text-slate-200 text-base">
                💬 We value your feedback and suggestions! Feel free to share your thoughts, wishes, or any other messages with us. Your input helps us improve and provide the best service possible.
              </p>
            </div>

            {!isContactFormShown && (
              <button 
                type="button"
                id="contact-form-shown-button"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-500 dark:via-purple-500 dark:to-cyan-500 hover:from-indigo-700 hover:via-purple-700 hover:to-cyan-700 dark:hover:from-indigo-600 dark:hover:via-purple-600 dark:hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/25 dark:hover:shadow-indigo-900/50 text-base"
                onClick={() => {
                  setIsContactFormShown(true)
                  setIsMessageSentSuccessfully(false)
                }}
              >
                📝 Contact Form
              </button>
            )}

            {isMessageSentSuccessfully && (
              <div 
                className="p-4 mt-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800/50 rounded-xl shadow-lg" 
                role="alert"
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="text-xl">✅</span>
                  <div>
                    <span className="font-bold text-green-800 dark:text-green-300 text-base">Success!</span>
                    <p className="text-green-700 dark:text-green-400 text-sm">Your message has been sent successfully. We'll get back to you soon!</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {isContactFormShown && (
            <div className="bg-gradient-to-br from-white via-indigo-50/30 to-cyan-50/50 dark:from-slate-900 dark:via-indigo-900/30 dark:to-cyan-900/50 rounded-2xl shadow-xl shadow-indigo-500/10 dark:shadow-indigo-950/50 border border-indigo-200/30 dark:border-slate-700 backdrop-blur-sm p-6">
              <ContactForm 
                className=""
                messageSentSuccessfully={() => {
                  setIsContactFormShown(false);
                  setIsMessageSentSuccessfully(true);
                }} 
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
