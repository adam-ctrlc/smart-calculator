export default function Legal() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6">
      {/* Document Container */}
      <div className="bg-surface border border-border-subtle rounded-xl shadow-2xl flex flex-col">
        {/* Document Header */}
        <div className="p-8 border-b border-border-subtle bg-surface/50 backdrop-blur-sm z-10">
          <h1 className="text-3xl font-bold text-white mb-2">
            Terms & Conditions
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-gray-400">
            <p>Smart Calc Open Source License (Apache 2.0)</p>
            <p>Last Updated: December 26, 2025</p>
          </div>
        </div>

        {/* Legal Text Area */}
        <div className="overflow-y-auto p-8 flex flex-col gap-8 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
          {/* Preamble */}
          <div className="prose prose-invert max-w-none text-gray-300 text-sm leading-relaxed">
            <p className="font-medium text-white">
              THIS AGREEMENT (the "Agreement") is made and entered into by and
              between:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1 my-4">
              <li>
                <span className="text-primary font-bold">The Developer:</span>{" "}
                Smart Calc and its contributors; and
              </li>
              <li>
                <span className="text-primary font-bold">The User:</span> You,
                the individual or entity accessing, downloading, or using the
                software.
              </li>
            </ul>
            <p>
              By accessing or using this website, the User explicitly agrees to
              be bound by the terms of this Agreement.
            </p>
          </div>

          <hr className="border-border-subtle/50" />

          {/* Section 1 */}
          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-white uppercase tracking-wide">
              1. Grant of License
            </h2>
            <div className="text-gray-300 text-sm leading-relaxed flex flex-col gap-4 pl-4 border-l-2 border-border-subtle">
              <p>
                <span className="text-gray-400 font-mono mr-2">1.1</span>
                Subject to the terms and conditions of this Agreement, the
                Developer hereby grants to the User a perpetual, worldwide,
                non-exclusive, no-charge, royalty-free, irrevocable copyright
                license to reproduce, prepare Derivative Works of, publicly
                display, publicly perform, sublicense, and distribute the Work
                and such Derivative Works in Source or Object form.
              </p>
              <p>
                <span className="text-gray-400 font-mono mr-2">1.2</span>
                The User is permitted to utilize the software for personal,
                academic, or commercial purposes without explicit prior written
                consent from the Developer, provided strict compliance with
                Section 2 (Redistribution) is maintained.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-white uppercase tracking-wide">
              2. User Obligations & Redistribution
            </h2>
            <div className="text-gray-300 text-sm leading-relaxed space-y-4 pl-4 border-l-2 border-border-subtle">
              <p>
                <span className="text-gray-400 font-mono mr-2">2.1</span>
                The User may reproduce and distribute copies of the Work or
                Derivative Works thereof in any medium, with or without
                modifications, provided that the User meets the following
                conditions:
              </p>
              <ul className="list-[lower-alpha] pl-8 flex flex-col gap-2">
                <li>
                  <strong className="text-white">License Propagation:</strong>{" "}
                  The User must give any other recipients of the Work or
                  Derivative Works a copy of this License;
                </li>
                <li>
                  <strong className="text-white">Attribution:</strong> The User
                  must retain, in the Source form of any Derivative Works, all
                  copyright, patent, trademark, and attribution notices
                  originally established by the Developer.
                </li>
                <li>
                  <strong className="text-white">Modification Notices:</strong>{" "}
                  The User must cause any modified files to carry prominent
                  notices stating that the User has changed the files and the
                  date of such change.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-white uppercase tracking-wide">
              3. Protection of Identity (Trademarks)
            </h2>
            <div className="text-gray-300 text-sm leading-relaxed space-y-4 pl-4 border-l-2 border-border-subtle">
              <p>
                <span className="text-gray-400 font-mono mr-2">3.1</span>
                This Agreement does <strong>not</strong> grant permission to the
                User to utilize the trade names, trademarks, service marks, or
                product names of the Developer (specifically "Smart Calc"),
                except as required for reasonable and customary use in
                describing the origin of the Work.
              </p>
              <p>
                <span className="text-gray-400 font-mono mr-2">3.2</span>
                The Developer retains all rights to the brand identity. The User
                acknowledges that while the code is open, the reputation and
                brand of the Developer are proprietary assets.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-white uppercase tracking-wide">
              4. Disclaimer of Warranty
            </h2>
            <div className="text-gray-300 text-sm leading-relaxed space-y-4 pl-4 border-l-2 border-border-subtle">
              <p className="uppercase">
                <span className="text-gray-400 font-mono mr-2">4.1</span>
                Unless required by applicable law or agreed to in writing, the
                Developer provides the Work on an "AS IS" BASIS, WITHOUT
                WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
              </p>
              <p className="uppercase font-semibold text-white/90 bg-white/5 p-3 rounded">
                THE DEVELOPER DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT
                LIMITED TO WARRANTIES OF TITLE, NON-INFRINGEMENT,
                MERCHANTABILITY, OR FITNESS FOR A PARTICULAR PURPOSE. THE USER
                IS SOLELY RESPONSIBLE FOR DETERMINING THE APPROPRIATENESS OF
                USING OR REDISTRIBUTING THE WORK.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-white uppercase tracking-wide">
              5. Limitation of Liability
            </h2>
            <div className="text-gray-300 text-sm leading-relaxed space-y-4 pl-4 border-l-2 border-border-subtle">
              <p className="uppercase font-semibold text-white/90 bg-white/5 p-3 rounded">
                <span className="text-gray-400 font-mono mr-2">5.1</span>
                IN NO EVENT AND UNDER NO LEGAL THEORY, WHETHER IN TORT
                (INCLUDING NEGLIGENCE), CONTRACT, OR OTHERWISE, SHALL THE
                DEVELOPER BE LIABLE TO THE USER FOR DAMAGES, INCLUDING ANY
                DIRECT, INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES
                OF ANY CHARACTER ARISING AS A RESULT OF THIS LICENSE OR OUT OF
                THE USE OR INABILITY TO USE THE WORK.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-white uppercase tracking-wide">
              6. Contributions
            </h2>
            <div className="text-gray-300 text-sm leading-relaxed space-y-4 pl-4 border-l-2 border-border-subtle">
              <p>
                <span className="text-gray-400 font-mono mr-2">6.1</span>
                Unless the User explicitly states otherwise, any Contribution
                intentionally submitted for inclusion in the Work by the User to
                the Developer shall be under the terms and conditions of this
                License, without any additional terms or conditions.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
