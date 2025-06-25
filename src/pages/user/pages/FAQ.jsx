import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openItems, setOpenItems] = useState(new Set());

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        // Simulate API call - replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // For now, use default data
        setFaqs(defaultFAQs);
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
        // Fallback data in case API fails
        setFaqs(defaultFAQs);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const isOpen = (id) => openItems.has(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading FAQ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about pet adoption, our process, and more.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-lg shadow-md">
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                {isOpen(faq.id) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {isOpen(faq.id) && (
                <div className="px-6 pb-4">
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-r from-orange-500 to-blue-500 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-lg mb-6">
            Can't find what you're looking for? Our team is here to help!
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-orange-600 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

// Default FAQ data as fallback
const defaultFAQs = [
  {
    id: '1',
    question: 'How does the adoption process work?',
    answer: 'Our adoption process is designed to ensure the best match for both pets and families. First, browse our available pets online or visit our facility. When you find a pet you\'re interested in, fill out an adoption application. We\'ll review your application and contact you within 24-48 hours to schedule a meet-and-greet. If everything goes well, we\'ll finalize the adoption paperwork and you can take your new friend home!'
  },
  {
    id: '2',
    question: 'What are the adoption fees?',
    answer: 'Adoption fees vary depending on the pet\'s age, size, and medical needs. Dogs typically range from $150-$400, while cats range from $100-$250. These fees help cover veterinary care, vaccinations, spaying/neutering, and other care costs. All pets come fully vetted and ready for their new homes.'
  },
  {
    id: '3',
    question: 'Are all pets spayed/neutered?',
    answer: 'Yes, all pets are spayed or neutered before adoption unless they are too young for the procedure. In cases where pets are too young, we require that the procedure be completed by a certain age and may ask for a refundable deposit to ensure compliance.'
  },
  {
    id: '4',
    question: 'Can I return a pet if it doesn\'t work out?',
    answer: 'We understand that sometimes adoptions don\'t work out despite everyone\'s best efforts. We have a return policy that allows you to bring the pet back within 30 days if there are significant issues. However, we encourage you to contact us first so we can provide support and resources to help resolve any challenges.'
  },
  {
    id: '5',
    question: 'Do you provide medical records?',
    answer: 'Absolutely! We provide complete medical records for every adopted pet, including vaccination history, spay/neuter certificates, and any treatments received while in our care. We also provide information about ongoing medical needs and recommended care.'
  },
  {
    id: '6',
    question: 'Can I meet a pet before applying?',
    answer: 'While we encourage you to apply first to streamline the process, we understand you may want to meet a pet before committing. You can visit during our open hours to meet available pets. However, popular pets may be adopted quickly, so we recommend applying as soon as possible if you\'re interested.'
  },
  {
    id: '7',
    question: 'What should I bring for the adoption?',
    answer: 'Please bring a valid ID, proof of residence, and payment for the adoption fee (cash, check, or card accepted). If you rent your home, bring a copy of your lease or landlord contact information. If you have other pets, we may require proof of current vaccinations.'
  },
  {
    id: '8',
    question: 'Do you offer training resources?',
    answer: 'Yes! We provide new pet parents with training resources, including basic care guides, training tips, and referrals to local trainers and behaviorists. Many of our pets have basic training, and we\'ll share information about their current training level and any specific needs.'
  }
];

export default FAQ;