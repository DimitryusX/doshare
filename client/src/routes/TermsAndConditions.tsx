import { Helmet } from "react-helmet-async";

export default function TermsAndConditionsPage() {
  return (
    <>
      <Helmet>
        <title>DO Share | Terms And Conditions</title>
      </Helmet>

      <div className="relative">
        <div className="py-4 max-w-4xl m-auto">
          <div className="bg-white dark:bg-slate-800 bg-gradient-to-br from-white via-indigo-50/30 to-cyan-50/50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 rounded-2xl shadow-xl shadow-indigo-500/10 dark:shadow-slate-900/50 border border-indigo-200/30 dark:border-slate-700 backdrop-blur-sm p-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent text-center mb-6">
              Terms and Conditions
            </h1>

            <div className="space-y-5 text-slate-700 dark:text-slate-300">
              <section>
                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  1. Introduction
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  By using this file upload and transfer service DoShare ("Service"), you agree to comply with and be bound by the following terms and conditions ("Terms"). If you do not agree with these Terms, you should not use the Service.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  2. Use of the Service
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  You are responsible for any content you upload, share, or otherwise transmit through the Service. You agree not to use the Service for any illegal activities, including but not limited to the transmission of copyrighted, offensive, or harmful materials.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  3. Temporary Storage and Access
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  The files and content you upload will be stored temporarily and will be accessible only via a unique link. The Service does not guarantee the availability of the uploaded content beyond the specified temporary storage period.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  4. Limitation of Liability
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  You acknowledge and agree that the Service is provided "as is" and "as available" without any warranties of any kind. We do not guarantee the security, reliability, or integrity of the files and content transmitted through the Service.
                </p>
                <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:bg-amber-950/60 dark:from-amber-950/60 dark:to-amber-950/60 dark:border-amber-900/50 border border-amber-200 rounded-xl">
                  <p className="font-semibold text-amber-800 dark:text-amber-200">
                    We shall not be liable for any loss, damage, or liability arising from the use of the Service, including but not limited to any direct, indirect, incidental, consequential, or punitive damages. This includes any loss of data, corruption of files, or unauthorized access to the files and content.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  5. User Responsibility
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  You are solely responsible for ensuring that the files and content you upload do not violate any laws or infringe on any third-party rights. You agree to indemnify and hold harmless the Service and its operators from any claims, damages, or liabilities resulting from your use of the Service.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  6. Termination
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  We reserve the right to terminate or suspend your access to the Service at any time, without notice, for any reason, including but not limited to a violation of these Terms.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  7. Changes to Terms
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  We reserve the right to modify these Terms at any time. Any changes will be posted on this page, and your continued use of the Service after such changes constitutes your acceptance of the new Terms.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  8. Governing Law
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of Ukraine, without regard to its conflict of law principles.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
