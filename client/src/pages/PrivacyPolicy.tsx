import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import Footer from "../components/Footer";

interface PrivacyPolicyProps {
  loggedIn: boolean;
  mentor: boolean;
  onLogout: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({
  loggedIn,
  mentor,
  onLogout,
}) => {
  useEffect(() => {}, [loggedIn, mentor]);

  return (
    <div className="min-h-screen bg-sky-200">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-[#08286b] flex justify-between items-center p-3 md:p-4 lg:p-6 shadow-md">
        <div>
          <a href="/" className="flex items-center">
            <img
              src={Logo}
              alt="Logo"
              className="h-8 w-24 md:h-10 md:w-28 lg:h-12 lg:w-36"
            />
          </a>
        </div>
        {!loggedIn ? (
          <div className="space-x-2 md:space-x-4">
            <Link to="/login">
              <button className="px-2 md:px-4 py-1.5 md:py-2 text-white text-sm md:text-base lg:text-base border rounded-lg hover:border-gray-500 transition">
                Login
              </button>
            </Link>

            <Link to="/signup">
              <button className="px-2 md:px-4 py-1.5 md:py-2 bg-white text-sm md:text-base lg:text-base text-black rounded-md hover:bg-gray-300 transition-colors">
                Join Now
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-x-2 md:space-x-4">
            <Link to="/">
              <button
                onClick={onLogout}
                className="px-2 md:px-4 py-1.5 md:py-2 text-white text-sm md:text-base lg:text-base border rounded-lg hover:border-gray-500 transition"
              >
                Logout
              </button>
            </Link>
            {mentor ? (
              <Link to="/dashboard">
                <button className="px-2 md:px-4 py-1.5 md:py-2 bg-white text-black text-sm md:text-base lg:text-base rounded-md hover:bg-gray-300 transition-colors">
                  Dashboard
                </button>
              </Link>
            ) : (
              <Link to="/dashboard/mentee">
                <button className="px-2 md:px-4 py-1.5 md:py-2 bg-white text-black text-sm md:text-base lg:text-base rounded-md hover:bg-gray-300 transition-colors">
                  Dashboard
                </button>
              </Link>
            )}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Terms & Privacy Policy
          </h1>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 text-xs mb-6">
              The user of this Website/Platform (“<b>User</b>”) agrees to be bound by
              the terms and conditions of this privacy policy (“<b>Policy</b>”). In the
              event the terms and conditions of the Policy are not agreeable to
              the User, the User is requested to refrain from using this
              Website/Application.
            </p>
            <p className="text-gray-600 text-xs mb-6">
              This website www.mentg.in (“<b>Website</b>”) is owned and operated by the
              management of MentG which expression shall mean and include its
              affiliates, successors and permitted assign. MentG provides
              services to the Users through the Website and is committed to
              protecting and respecting the privacy of the Users.
            </p>
            <p className="text-gray-600 text-xs mb-6">
              This Policy is a legally binding document between the User and
              MentG. The terms of this Policy will be effective upon the User’s
              acceptance of the same (directly or indirectly in electronic form,
              by clicking on the “I accept the Privacy Policy” tab or by use of
              the Website) and will govern the relationship between the User and
              MentG.
            </p>
            <p className="text-gray-600 text-xs mb-6">
              This Policy forms an electronic contract within the provisions of
              the Information Technology Act, 2000 (“<b>IT Act</b>”), the rules
              made thereunder and the amended provisions pertaining to
              electronic documents/records in various statutes as amended by the
              IT Act, from time to time. This Policy does not require any
              physical, electronic or digital signature.
            </p>
            <p className="text-gray-600 text-xs mb-6">
              This Policy shall, at all times be read and construed in
              consonance and along with the terms of use and access of the
              Website (“<b>T&C</b>”).
            </p>
            <p className="text-gray-600 text-xs mb-6">
              This Policy highlights inter alia the type of data
              shared/collected from a User in the course of the User’s usage of
              the Website. The Policy further intends to apprise the User of the
              purposes for which the data of the User is collected and the
              Website’s policy with regard to sharing such personal information
              with third party entities.
            </p>
            <p className="text-gray-600 text-xs mb-6">
              The terms “We”/ “Us”/ “Our” individually and collectively refer to
              and are synonymous with the term ‘MentG’ and the terms “You” /
              “Your” / “Yourself” are to be construed to be synonymous with the
              term ‘User’.
            </p>
            <p className="text-gray-600 text-xs mb-6">
              All defined terms used within this Policy but not specifically
              defined herein shall draw their meaning from the definition
              ascribed to such term under the T&C.
            </p>
            <p className="text-gray-600 text-xs mb-6">
              In the course of using this Website or availing the products and
              services vide the online application forms and questionnaires,
              MentG and its affiliates may become privy to the personal
              information of its Users, including information that is of a
              confidential nature.
            </p>
            <p className="text-gray-600 text-xs mb-6">
              MentG is strongly committed to protecting the privacy of its Users
              and has taken all necessary and reasonable measures to protect the
              confidentiality of the User information and its transmission
              through the World Wide Web. MentG shall not be held liable for
              disclosure of the confidential information if such disclosure is
              in accordance with this Privacy Policy or in accordance with the
              terms of any agreements entered into with the Users. MentG also
              assures not to disclose all information that it learns during the
              transactions and payments made to the User’s account(s).
            </p>
            <p className="text-gray-600 text-xs mb-6">
              “<b>User(s)</b>” shall mean and include all individuals, companies and
              private organisations that visit the Website and provide
              information to MentG through any of the modes referred to in the
              clause on “Collection of Information” below.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Collection of Information
            </h2>
            <p className="text-gray-600 text-xs mb-4">
              During the use of the Website, MentG may collect and process such
              information from the Users, including but not limited to to the
              below mentioned:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600 text-xs">
              <li className="mb-2">
                Information that the Users provide to MentG by filling in forms
                on the Website. This includes contact information such as name,
                email address, mailing address, phone number, financial
                information, if any, unique identifiers such as user name,
                account number, password and preferences information such as
                favourites lists and transaction history.
              </li>
              <li className="mb-2">
                Information that the Users provide when the Users write directly
                to MentG (including by way of e-mail).
              </li>
              <li className="mb-2">
                Information that the Users provide to MentG over telephone.
                MentG may make and keep a record of the information shared by
                the Users with MentG.
              </li>
              <li className="mb-2">
                Information that the Users provide to MentG by completing
                surveys.
              </li>
              <li className="mb-2">
                Information relating to logs is automatically reported by the
                User’s browser each time the User accesses a web page. When the
                User uses the Website, MentG’s servers automatically record
                certain information that the User’s web browser sends whenever
                the User visits any website. These server logs may include
                information such as the User’s web request, Internet Protocol
                (IP) address, browser type, referring/ exit pages and URLs,
                number of clicks, domain names, landing pages, pages viewed, and
                other such information. MentG uses this information, which does
                not identify Users, to analyse trends, to administer the
                Website, to track Users’ movements around the Website and to
                gather demographic information about the User base as a whole.
                MentG does not link this automatically-collected data to
                personally identifiable information.
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Representation and Warranties
            </h2>
            <p className="text-gray-600 text-xs mb-4">
              Every User hereby represents and warrants to MentG that:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600 text-xs">
              <li className="mb-2">
                All Information provided by the User is true, correct, current
                and updated.
              </li>
              <li className="mb-2">
                All Information provided by the User and the provision of such
                Information by the User does not in any manner violate any third
                party agreement, law, decree, order or judgement.
              </li>
              <li className="mb-2">
                All Information provided by the User does not belong to any
                third party, and if it does belong to a third party, the User is
                duly authorized by such Third Party to use, access and
                disseminate such Information.
              </li>
              <li className="mb-2">
                The officers, directors, contractors or agents of MentG shall
                not be responsible in any manner whatsoever with regard to the
                authenticity or veracity of the Information that a User may
                provide to the Website and
              </li>
              <li className="mb-2">
                The User shall indemnify and hold harmless MentG and each of its
                officers, directors, contracts or agents and any third party
                relying on the Information provided by the User in the event the
                User is in breach of this Policy.
              </li>
              <li className="mb-2">
                MentG represents and warrants to every User that:
                <ol className="list-disc pl-6 mt-2 mb-6 text-gray-600 text-xs">
                  <li className="mb-2">
                    It shall not collect the User’s sensitive personal data
                    unless such sensitive personal data is collected for a
                    lawful purpose for which such collection of data is
                    necessary.
                  </li>
                  <li className="mb-2">
                    It shall not retain any sensitive personal data for longer
                    than such sensitive personal data is required or can be
                    lawfully used.
                  </li>
                  <li className="mb-2">
                    In the event MentG collects Information directly from the
                    User, MentG shall make reasonable effort to apprise the User
                    of the purpose of such collection of Information, the
                    intended recipient of the Information and the details of the
                    agencies collecting and retaining the Information.
                  </li>
                  <li className="mb-2">
                    iv. It has in place the security practices and procedures
                    prescribed under the Information Technology (Reasonable
                    Security Practices and Procedures and Sensitive Personal
                    Data or Information) Rules, 2011 (“<b>IT Rules</b>”).
                  </li>
                </ol>
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Non-Disclosure
            </h2>
            <p className="text-gray-600 text-xs mb-4">
              MentG pledges that it shall not sell or rent Users’ personal
              details to anyone. MentG will protect every bit of the Users’
              business or personal information and maintain the confidentiality
              of the same. With this seal of trust, MentG makes its services
              available to the Users for assessment and analysis that include
              credit and behaviour scoring, market and product analysis.
            </p>
            <p className="text-gray-600 text-xs mb-4">
              MentG guarantees that it is going to keep all information
              confidential except in the following cases:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600 text-xs">
              <li className="mb-2">
                MentG may disclose Users’ information to governmental and other
                statutory bodies who have appropriate authorisation to access
                the same for any specific legal purposes.
              </li>
              <li className="mb-2">
                MentG may disclose Users’ information if it is under a duty to
                do so in order to comply with any legal obligation, or in order
                to enforce or apply the Terms of Use (displayed on the Website),
                or to protect the rights, property or safety of MentG, its Users
                or others. This includes exchanging information with other
                companies / agencies that work for fraud prevention and credit
                reference.
              </li>
              <li className="mb-2">
                MentG may disclose Users’ information to its agents under a
                strict code of confidentiality.
              </li>
              <li className="mb-2">
                MentG may disclose Users’ information to such third parties to
                whom it transfers its rights and duties under the customer
                agreement entered into with the Users. In such an event, the
                said third parties’ use of the information will be subject to
                such confidentiality obligations as contained in this Policy.
              </li>
              <li className="mb-2">
                MentG may disclose Users’ information to any member of its
                related or group companies including its subsidiaries, its
                ultimate holding company and its subsidiaries, as the case may
                be.
              </li>
              <li className="mb-2">
                In the event that MentG sells or buys any business or assets, it
                may disclose the Users’ information to the prospective seller or
                buyer of such business or assets. User, email and visitor
                information is generally one of the transferred business assets
                in these types of transactions. MentG may also transfer or
                assign such information in the course of corporate divestitures,
                mergers or dissolution.
              </li>
            </ul>
            <p className="text-gray-600 text-xs mb-4">
              MentG shall ensure that in case of disclosure of whole or part of
              the User’s information to a service provider or agent, within or
              outside India, the same shall be bound by obligations of
              confidentiality at least as strict as MentG’s obligations under
              this Privacy Policy and the information shall be accorded the same
              level of protection as provided by MentG under the terms of this
              Privacy Policy. MentG may store the User’s information in
              locations outside the direct control of MentG (for instance, on
              servers or databases co-located with hosting providers).
            </p>
            <p className="text-gray-600 text-xs mb-4">
              MentG never will sell or rent personal information of its clients
              to anyone, at any time, for any reason. MentG may use the User’s
              personal information in the following ways, viz:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600 text-xs">
              <li className="mb-2">
                Monitor, improve and administer the Website and improve the
                quality of services.
              </li>
              <li className="mb-2">
                Analyse how the Website is used, diagnose service or technical
                problems, maintain security.
              </li>
              <li className="mb-2">
                Remember information to help the User effectively access the
                Website.
              </li>
              <li className="mb-2">
                Monitor aggregate metrics such as total number of views,
                visitors, traffic and demographic patterns;
              </li>
              <li className="mb-2">
                To confirm the User’s identity in order to determine its
                eligibility to use the Website and avail of the services;
              </li>
              <li className="mb-2">
                To notify the User about changes to the Website;
              </li>
              <li className="mb-2">
                To enable MentG to comply with its legal and regulatory
                obligations;
              </li>
              <li className="mb-2">
                To help the User apply for certain products and services.
              </li>
              <li className="mb-2">
                For the purpose of sending administrative notices, service
                related alerts and other similar communication with a view to
                optimising the efficiency of the Website.
              </li>
              <li className="mb-2">
                Doing market research, troubleshooting, protection against
                error, project planning, fraud and other criminal activity.
              </li>
              <li className="mb-2">To reinforce MentG’s Terms of Use.</li>
            </ul>
            <p className="text-gray-600 text-xs mb-4">
              Access to personal information is strictly restricted and shared
              in accordance with certain specific internal procedures and
              safeguards that govern access. Certain features of the Website are
              available for use without any need to provide details. Other
              features of the Website may require Users to provide details
              including but not limited to the User’s name, address, mobile
              number, email address, PAN No., employment & income details.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Protection of Information
            </h2>
            <ul className="list-disc pl-6 mb-6 text-gray-600 text-xs">
              <li className="mb-2">
                MentG understands and acknowledges the importance of security
                and protection of the Information provided by and/or collected
                from the Users. Pursuant to the same, MentG shall make the best
                efforts to ensure protection of Information by use of such
                security measures and programs that it may deem fit for the
                purpose. We shall employ best efforts to protect the Information
                against any unauthorized, illegal and fraudulent use of such
                Information by third parties.
              </li>
              <li className="mb-2">
                Notwithstanding anything to the contrary, MentG shall not be
                held responsible for any loss, damage or misuse of the
                Information caused to the User, if such loss, damage or misuse
                is attributable to an event beyond the control of or
                attributable to MentG or a force majeure event.
              </li>
              <li className="mb-2">
                MentG shall ensure that the Website shall adopt appropriate
                encryption and security measures to prevent any hacking of the
                information of the Users and third parties and shall ensure that
                the User shall not be required or asked to disclose any
                Information, which may be prejudicial to the interests of the
                User. Currently, the content available on the Website is
                encrypted with AES 256 encryption where the data transfers are
                secured with HTTPS secured protocols.
              </li>
              <li className="mb-2">
                MentG shall use the Information collected from the Users in
                accordance with applicable laws including but not limited to the
                IT Act and the rules made thereunder and use the Information
                only for the purpose for which it was furnished.
              </li>
              <li className="mb-2">
                MentG has appropriate physical, electronic and managerial
                procedures in relation to the Website. The servers of the
                Website are accessible only to the authorized personnel and any
                Information of the User shall be shared with the authorized
                personnel only on a need to know basis to facilitate the
                services requested by the User. MentG shall endeavour to
                safeguard the confidentiality of a User’s personally
                identifiable information, however, the transmissions made by
                means of the Internet cannot be made absolutely secure by the
                Website. The User agrees and acknowledges that MentG shall not
                be liable for disclosure of any information due to errors in
                transmission or any unauthorized acts of third parties.
              </li>
              <li className="mb-2">
                The User agrees and acknowledges that MentG shall be entitled to
                share the Information where such sharing is necessary for the
                lawful performance of the contractual obligations existing
                between MentG and the User and for such purposes as it may deem
                fit, however, the disclosure of Information shall be in
                accordance with this Policy, the IT Act and the rules made
                thereunder.
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Security of Information
            </h2>
            <p className="text-gray-600 text-xs mb-6">
              MentG takes the security of its User’s information very seriously.
              MentG protects the User’s information using bank-level data
              security: 128 bit-encryption and a Secure Sockets Layer (SSL)
              protocol. This creates an encrypted connection between the User’s
              browser and MentG’s servers. All information remains encrypted at
              all times. If the User allows MentG to see its banking information
              online rather than in paper form, it is on a read-only basis.
              MentG does not have access to change, edit, or modify bank account
              information in any manner whatsoever. MentG employees cannot view
              the User’s banking username and passwords, and the same is
              securely stored in separate encrypted areas with its financial
              services providers.
            </p>
            <p className="text-gray-600 text-xs mb-6">
              All information provided to MentG is stored on its secure servers
              whether outside or within India.
            </p>
            <p className="text-gray-600 text-xs mb-6">
              The information that is collected from the Users may be
              transferred to, and stored at, a destination inside or outside
              India. By submitting information on the Website, the Users agree
              to this transfer, storing and/ or processing. MentG will take such
              steps as it considers reasonably necessary to ensure that the
              Users’ information is treated securely and in accordance with the
              Policy.
            </p>
            <p className="text-gray-600 text-xs mb-6">
              In using the Website, the Users accept the inherent security
              implications of data transmission over the internet and the World
              Wide Web cannot always be guaranteed as completely secure.
              Therefore, the use of the Website will be at the own risk of the
              Users.
            </p>
            <p className="text-gray-600 text-xs mb-6">
              MentG assumes no liability for any disclosure of information due
              to errors in transmission, unauthorised third party access or
              other acts of third parties, or acts or omissions beyond its
              reasonable control and the User agrees not to hold MentG
              responsible for any breach of security unless such breach has been
              caused as a direct result of gross negligence or wilful default by
              MentG.
            </p>
            <p className="text-gray-600 text-xs mb-6">
              In the event MentG becomes aware of any breach of the security of
              the Users’ information, it will promptly notify the Users and take
              appropriate action to the best of its ability to remedy such a
              breach.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Exclusion
            </h2>
            <p className="text-gray-600 text-xs mb-6">
              This Policy does not apply to any information other than
              information collected by MentG through the Website including such
              information collected in accordance with the clause on “Collection
              of Information” above. This Policy shall not apply to any
              unsolicited information provided by the Users through this Website
              or through any other means. This includes, but is not limited to,
              information posted to any public areas of the Website. All such
              unsolicited information shall be deemed to be non-confidential and
              MentG shall be free to use, disclose such unsolicited information
              without limitation.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Cookies
            </h2>
            <p className="text-gray-600 text-xs mb-6">
              MentG collects certain information from the User’s browser using
              small data files called “cookies.” MentG uses session ID cookies
              to confirm that customers are logged in. This type of cookie helps
              MentG recognize a customer if he or she visits multiple pages on
              the Website during the same session, so that separate passwords
              are not required to access each page. These cookies terminate once
              the customer closes the browser. By default, MentG uses a
              persistent cookie that stores customer login ID (but not password)
              to make it easier for the customer to login when returning to the
              Website. MentG encodes its cookies so that only MentG can
              interpret the information stored in them. The User may remove or
              block this cookie using the User’s browser settings to disable the
              feature.
            </p>
            <p className="text-gray-600 text-xs mb-6">
              MentG collects certain information from the User’s browser using
              small data files called “cookies.” MentG uses session ID cookies
              to confirm that customers are logged in. This type of cookie helps
              MentG recognize a customer if he or she visits multiple pages on
              the Website during the same session, so that separate passwords
              are not required to access each page. These cookies terminate once
              the customer closes the browser. By default, MentG uses a
              persistent cookie that stores customer login ID (but not password)
              to make it easier for the customer to login when returning to the
              Website. MentG encodes its cookies so that only MentG can
              interpret the information stored in them. The User may remove or
              block this cookie using the User’s browser settings to disable the
              feature.
            </p>
            <p className="text-gray-600 text-xs mb-6">
              MentG also stores transaction history. MentG may collect
              additional information in ways not specifically described herein.
              For example, MentG may track information related to interactions
              with customer service or responses from surveys or other feedback
              tools. MentG uses this information to continually improve the
              service provided to the customers.
            </p>
            <p className="text-gray-600 text-xs mb-6">
              MentG’s Privacy Policy does not cover the use of cookies by its
              partners and affiliates. MentG does not have access or control
              over these cookies. MentG’s partners and affiliates may use
              session ID cookies to provide a custom user experience and to
              track the success of MentG’s partnership with them.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Web Beacons
            </h2>
            <p className="text-gray-600 text-xs mb-6">
              The web pages of the Website contain electronic images known as
              “web beacons” (sometimes called single-pixel gifs) and are used
              along with cookies to compile aggregated statistics to analyse how
              the Website is used. Web beacons may also be used in some of
              MentG’s emails so as to know which emails and links recipients
              have opened, allowing it to gauge the effectiveness of its
              customer communications and marketing campaigns.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Referrals
            </h2>
            <p className="text-gray-600 text-xs mb-6">
              If the User wishes to introduce MentG / the Website to any other
              person / entity, the User will be asked to provide such person /
              entity’s name and email address. MentG will automatically send
              such person / entity an email inviting it or to visit the Website.
              MentG stores this information for the purpose of sending this
              email and keeping a record of the number of persons / entities so
              referred by the Users. MentG may send additional emails to the
              said person / entity in connection with services offered by MentG.
              Such person / entity may contact MentG at email id to request that
              this information be removed from MentG’s database.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Links to Third Party Websites
            </h2>
            <p className="text-gray-600 text-xs mb-6">
              The Website includes links to other websites whose privacy
              practices may differ from those of MentG. The inclusion of a link
              does not imply any endorsement by MentG of the third party
              website, the website's provider, or the information on the third
              party website. If the Users submit personal information to any of
              those websites, such information is governed by the privacy
              policies of such third party websites and MentG disclaims all
              responsibility or liability with respect to these policies or the
              websites. The Users are encouraged to carefully read the privacy
              policy of any website that they visit.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Social Media Widgets
            </h2>
            <p className="text-gray-600 text-xs mb-6">
              The Website includes Social Media Features, such as the Facebook
              “Like” button and Widgets, or interactive mini-programs that run
              on the Website. These features may collect the Users’ IP address,
              which page the Users are visiting on the Website, and may set a
              cookie to enable the feature to function properly. Social media
              features and widgets are either hosted by a third party or hosted
              directly on the Website. The Users’ interactions with these
              features are governed by the privacy policy of the company
              providing it.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Opting Out or Editing Customer Information
            </h2>
            <p className="text-gray-600 text-xs mb-6">
              To opt out of email correspondence from MentG or make a change to
              (or delete) the User information stored in MentG’s records, please
              contact MentG at support@mentg.in
            </p>
            <p className="text-gray-600 text-xs mb-6">
              The User may write to MentG at, <br /> <br />
              Vaishali J. <br />
              304, Excellence Tower, Plot 17, Sec 17, <br />
              Roadpali, Kalamboli, MH 410218
            </p>
            <p className="text-gray-600 text-xs mb-6">
              MentG will respond to the User’s request within 30 days.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Data Retention
            </h2>
            <p className="text-gray-600 text-xs mb-6">
              User information will be retained for as long as the User account
              is active or as needed to provide services to the User. If the
              User wishes to cancel its account or requests that MentG no longer
              uses its information to provide services, the User may contact
              MentG at Company email id. MentG will retain and use User
              information as necessary to comply with its legal obligations,
              resolve disputes, and enforce its agreements or for other business
              purposes.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Changes to Privacy Policy
            </h2>
            <p className="text-gray-600 text-xs mb-6">
              In the event MentG modifies this Privacy Policy, the same will be
              updated on the Website. In case of any material changes to the
              Policy, the Users will be notified by email (sent to the email
              address specified in the User’s account) or by means of a notice
              on this Website prior to the change becoming effective. The Users
              are encouraged to periodically review this page for the latest
              information on its privacy practices.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Serverability
            </h2>
            <p className="text-gray-600 text-xs mb-6">
              MentG has made every effort to ensure that this Policy adheres
              with the applicable laws. The invalidity or unenforceability of
              any part of this Policy shall not prejudice or affect the validity
              or enforceability of the remainder of this Policy.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              No Wavier
            </h2>
            <p className="text-gray-600 text-xs mb-6">
              The rights and remedies available under this Policy may be
              exercised as often as necessary and are cumulative and not
              exclusive of rights or remedies provided by law. It may be waived
              only in writing. Delay in exercising or non-exercise of any such
              right or remedy does not constitute a waiver of that right or
              remedy, or any other right or remedy.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Governing Law or Dispute Resolution
            </h2>
            <p className="text-gray-600 text-xs mb-6">
              This Policy shall be governed by and construed in accordance with
              the laws of the Republic of India and subject to the provisions of
              arbitration set out herein, the courts at Mumbai shall have
              exclusive jurisdiction in relation to any disputes arising out of
              or in connection with this Policy.
            </p>
            <p className="text-gray-600 text-xs mb-6">
              If any dispute arises between MentG and the User in connection
              with or arising out of the validity, interpretation,
              implementation or alleged breach of any provision of the Policy,
              such dispute shall be referred to and finally resolved by
              arbitration in accordance with the Indian Arbitration and
              Conciliation Act, 1996 for the time being in force, which rules
              are deemed to be incorporated by reference in this clause.
            </p>
            <p className="text-gray-600 text-xs mb-6">
              There shall be one (1) arbitrator as appointed by MentG and the
              seat of the arbitration shall be Mumbai, India.
            </p>
            <p className="text-gray-600 text-xs mb-6">
              The language of the arbitration proceedings and of all written
              decisions and correspondence relating to the arbitration shall be
              English.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Foreign Jurisdiction
            </h2>
            <p className="text-gray-600 text-xs mb-6">
              MentG makes no representation that the content contained on the
              Website is appropriate or to be used or accessed outside of the
              Republic of India. If the Users use or access the Website from
              outside the Republic of India, they do so at their own risk and
              are responsible for compliance with the laws of such jurisdiction.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Contact
            </h2>
            <div className="bg-gray-200 text-xs p-6 rounded-lg">
              <p className="text-gray-600 mb-2">
                Any questions or concerns should be addressed to:
              </p>
              <p className="text-gray-800 font-medium">support@mentg.in</p>
              <p className="text-gray-800 mt-4">
                MentG
                <br />
                Vaishali J.
                <br />
                304, Excellence Tower, Plot 17, Sec 17
                <br />
                Roadpali, Kalamboli, MH 410218
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
