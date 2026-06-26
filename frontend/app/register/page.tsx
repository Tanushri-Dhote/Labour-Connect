"use client";

import React, { useState, useEffect } from "react";
import { 
  Phone, 
  User as UserIcon, 
  MapPin, 
  Briefcase, 
  IndianRupee, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Languages, 
  LogOut, 
  Upload, 
  ArrowRight, 
  ArrowLeft, 
  Navigation, 
  Loader2, 
  AlertCircle,
  Clock,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types ---
interface Category {
  _id: string;
  name: string;
}

interface Skill {
  _id: string;
  name: string;
  categoryId: string;
}

interface User {
  _id: string;
  mobile: string;
  role: string | null;
  isVerified: boolean;
  profileCompleted: boolean;
}

interface ProfileData {
  fullName?: string;
  age?: number;
  gender?: "male" | "female" | "other";
  profileImage?: string;
  homeAddress?: string;
  homeLatitude?: number;
  homeLongitude?: number;
  currentLocation?: string;
  currentLatitude?: number;
  currentLongitude?: number;
  preferredWorkLocation?: string;
  preferredWorkLatitude?: number;
  preferredWorkLongitude?: number;
  categoryId?: string;
  skills?: string[];
  chargeAmount?: number;
  chargeType?: "hour" | "day" | "week" | "month";
  availability?: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  experience?: string;
  workType?: string;
  additionalInfo?: string;
  documentUrl?: string;
  documentType?: string;
  adminApprovalStatus?: "pending" | "approved" | "rejected";
}

export default function RegisterPage() {
  // --- States ---
  const [lang, setLang] = useState<"hi" | "en">("hi");
  const [step, setStep] = useState<number>(0);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Lists loaded from APIs
  const [categories, setCategories] = useState<Category[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  // Step 0: Auth Form States
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>("");
  const [demoOtp, setDemoOtp] = useState<string | null>(null);

  // Wizard Form Data State
  const [formData, setFormData] = useState<ProfileData>({
    fullName: "",
    age: undefined,
    gender: undefined,
    profileImage: "",
    homeAddress: "",
    homeLatitude: undefined,
    homeLongitude: undefined,
    currentLocation: "",
    currentLatitude: undefined,
    currentLongitude: undefined,
    preferredWorkLocation: "",
    preferredWorkLatitude: undefined,
    preferredWorkLongitude: undefined,
    categoryId: "",
    skills: [],
    chargeAmount: undefined,
    chargeType: "day",
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false,
    },
    experience: "",
    workType: "Daily wage",
    additionalInfo: "",
    documentUrl: "",
    documentType: "Aadhar Card",
  });

  // --- Translation Dictionary ---
  const t = {
    hi: {
      metaTitle: "लेबर पंजीकरण पोर्टल",
      subtitle: "बिना किसी एजेंट के सीधे काम देने वालों से जुड़ें। 100% मुफ्त पंजीकरण।",
      logout: "लॉगआउट",
      step: "चरण",
      next: "आगे बढ़ें",
      back: "पीछे जाएं",
      submit: "पंजीकरण जमा करें",
      loading: "लोड हो रहा है...",
      uploading: "अपलोड हो रहा है...",
      selectOption: "चुनें...",
      demoOtpAlert: "डेमो के लिए OTP: ",
      
      // Step 0: OTP Auth
      authTitle: "मोबाइल नंबर सत्यापित करें",
      phoneLabel: "अपना 10-अंकों का मोबाइल नंबर दर्ज करें",
      phonePlaceholder: "जैसे: 9876543210",
      sendOtpBtn: "OTP भेजें",
      otpLabel: "OTP दर्ज करें",
      otpPlaceholder: "जैसे: 123456",
      verifyBtn: "सत्यापित करें और आगे बढ़ें",
      roleSetting: "आपके अकाउंट का रोल सेट किया जा रहा है...",

      // Step 1: Personal Info
      step1Title: "व्यक्तिगत जानकारी",
      step1Subtitle: "कृपया अपनी मूल व्यक्तिगत जानकारी भरें।",
      fullNameLabel: "पूरा नाम (आधार कार्ड के अनुसार)",
      fullNamePlaceholder: "जैसे: राजेश कुमार",
      ageLabel: "आपकी उम्र (वर्षों में)",
      agePlaceholder: "जैसे: 30",
      genderLabel: "लिंग",
      genderMale: "पुरुष",
      genderFemale: "महिला",
      genderOther: "अन्य",
      photoLabel: "अपनी प्रोफाइल फोटो अपलोड करें",
      photoHint: "साफ फोटो अपलोड करें जिससे नियोक्ता आपको पहचान सकें। (JPEG, PNG)",

      // Step 2: Address & Coordinates
      step2Title: "पता और स्थान",
      step2Subtitle: "हम आपकी लोकेशन के हिसाब से आपके पास काम ढूंढेंगे।",
      homeAddressLabel: "घर का स्थायी पता",
      homeAddressPlaceholder: "गाँव/शहर, ब्लॉक, जिला, राज्य का नाम दर्ज करें",
      currentLocationLabel: "वर्तमान रहने का स्थान (Current Location)",
      currentLocationPlaceholder: "आप अभी कहाँ रह रहे हैं",
      preferredWorkLocationLabel: "पसंदीदा काम करने का क्षेत्र",
      preferredWorkLocationPlaceholder: "जैसे: पटना शहर, 10 किमी दायरा",
      gpsBtn: "📍 मेरी वर्तमान GPS लोकेशन भरें",
      gpsSuccess: "GPS लोकेशन सफलतापूर्वक लोड की गई!",
      gpsError: "लोकेशन प्राप्त करने में असमर्थ। कृपया मैन्युअल रूप से लिखें।",

      // Step 3: Work Categories & Skills
      step3Title: "कार्य और कौशल",
      step3Subtitle: "अपनी विशेषज्ञता की श्रेणी और कौशल चुनें।",
      categoryLabel: "अपनी मुख्य कार्य श्रेणी चुनें",
      skillsLabel: "अपने पास मौजूद कौशल चुनें (एक से अधिक चुन सकते हैं)",
      noSkillsInCategory: "इस श्रेणी में अभी कोई कौशल उपलब्ध नहीं है।",

      // Step 4: Charges & Rates
      step4Title: "दैनिक या मासिक रेट",
      step4Subtitle: "अपना सही चार्ज तय करें जिसे देखकर लोग आपको काम पर रख सकें।",
      chargeAmountLabel: "चार्ज की राशि (₹)",
      chargeAmountPlaceholder: "जैसे: 500",
      chargeTypeLabel: "चार्ज का प्रकार",
      rateHour: "प्रति घंटा (per hour)",
      rateDay: "प्रति दिन (per day)",
      rateWeek: "प्रति सप्ताह (per week)",
      rateMonth: "प्रति महीना (per month)",

      // Step 5: Weekly Availability
      step5Title: "काम के लिए उपलब्धता",
      step5Subtitle: "हफ़्ते के किन दिनों में आप काम करने के लिए उपलब्ध हैं?",
      dayMonday: "सोमवार",
      dayTuesday: "मंगलवार",
      dayWednesday: "बुधवार",
      dayThursday: "गुरुवार",
      dayFriday: "शुक्रवार",
      daySaturday: "शनिवार",
      daySunday: "रविवार",

      // Step 6: Experience & Registration Docs
      step6Title: "अनुभव और दस्तावेज़",
      step6Subtitle: "पंजीकरण पूरा करने के लिए अपना अनुभव और एक सरकारी पहचान पत्र अपलोड करें।",
      expLabel: "काम का कुल अनुभव (विवरण)",
      expPlaceholder: "जैसे: मुझे घरों में पेंटिंग का 5 साल का अनुभव है और मैं अच्छी फिनिशिंग का काम करता हूँ।",
      workTypeLabel: "काम का प्रकार",
      docTypeLabel: "दस्तावेज़ का प्रकार",
      docFileLabel: "पहचान पत्र अपलोड करें (आधार कार्ड / वोटर आईडी)",
      docFileHint: "फोटो साफ़ होनी चाहिए ताकि आपका विवरण पढ़ा जा सके। (PDF, JPG, PNG)",

      // Step 7: Completed Success
      successTitle: "पंजीकरण सफलतापूर्वक सबमिट हुआ!",
      successSubtitle: "आपकी प्रोफाइल समीक्षा (Review) के अधीन है।",
      successDesc1: "हमारे व्यवस्थापक (Admin) 24 से 48 घंटे के भीतर आपके विवरणों का सत्यापन करेंगे।",
      successDesc2: "एक बार स्वीकृत (Approved) होने के बाद, आपका प्रोफ़ाइल नियोक्ताओं को दिखाई देने लगेगा और वे आपसे सीधे संपर्क कर सकेंगे।",
      goHome: "होमपेज पर जाएं"
    },
    en: {
      metaTitle: "Labour Registration Portal",
      subtitle: "Connect directly with local employers without middleman agents. 100% free registration.",
      logout: "Logout",
      step: "Step",
      next: "Continue",
      back: "Go Back",
      submit: "Submit Registration",
      loading: "Loading...",
      uploading: "Uploading...",
      selectOption: "Select...",
      demoOtpAlert: "Demo OTP is: ",

      // Step 0: OTP Auth
      authTitle: "Verify Mobile Number",
      phoneLabel: "Enter your 10-digit mobile number",
      phonePlaceholder: "e.g., 9876543210",
      sendOtpBtn: "Send OTP",
      otpLabel: "Enter Verification Code (OTP)",
      otpPlaceholder: "e.g., 123456",
      verifyBtn: "Verify & Proceed",
      roleSetting: "Setting up account role...",

      // Step 1: Personal Info
      step1Title: "Personal Information",
      step1Subtitle: "Please fill in your basic personal details.",
      fullNameLabel: "Full Name (as in Aadhar Card)",
      fullNamePlaceholder: "e.g., Rajesh Kumar",
      ageLabel: "Your Age (in years)",
      agePlaceholder: "e.g., 30",
      genderLabel: "Gender",
      genderMale: "Male",
      genderFemale: "Female",
      genderOther: "Other",
      photoLabel: "Upload Profile Photo",
      photoHint: "Upload a clear photo so employers can easily recognize you. (JPEG, PNG)",

      // Step 2: Address & Coordinates
      step2Title: "Address & Location",
      step2Subtitle: "We match you with jobs close to your coordinates.",
      homeAddressLabel: "Permanent Home Address",
      homeAddressPlaceholder: "Enter Village/City, Block, District, State Name",
      currentLocationLabel: "Current Location",
      currentLocationPlaceholder: "Where are you staying right now",
      preferredWorkLocationLabel: "Preferred Work Area",
      preferredWorkLocationPlaceholder: "e.g., Patna City, 10km radius",
      gpsBtn: "📍 Autofill my current GPS coordinates",
      gpsSuccess: "GPS coordinates loaded successfully!",
      gpsError: "Unable to retrieve location. Please type manually.",

      // Step 3: Work Categories & Skills
      step3Title: "Work & Skills",
      step3Subtitle: "Choose your primary trade category and specific skills.",
      categoryLabel: "Select your Main Category",
      skillsLabel: "Select your Skills (multiple selection allowed)",
      noSkillsInCategory: "No skills available in this category yet.",

      // Step 4: Charges & Rates
      step4Title: "Expected Rates & Charges",
      step4Subtitle: "Set a fair price so employers can book you easily.",
      chargeAmountLabel: "Charge Amount (₹)",
      chargeAmountPlaceholder: "e.g., 500",
      chargeTypeLabel: "Rate Basis",
      rateHour: "per hour",
      rateDay: "per day",
      rateWeek: "per week",
      rateMonth: "per month",

      // Step 5: Weekly Availability
      step5Title: "Work Availability",
      step5Subtitle: "On which days of the week are you available to work?",
      dayMonday: "Monday",
      dayTuesday: "Tuesday",
      dayWednesday: "Wednesday",
      dayThursday: "Thursday",
      dayFriday: "Friday",
      daySaturday: "Saturday",
      daySunday: "Sunday",

      // Step 6: Experience & Registration Docs
      step6Title: "Experience & Documents",
      step6Subtitle: "Upload a government ID proof and specify work experience details.",
      expLabel: "Work Experience Summary",
      expPlaceholder: "e.g., 5 years of experience in wall painting, texture finish, etc.",
      workTypeLabel: "Employment Type",
      docTypeLabel: "Identification Document Type",
      docFileLabel: "Upload ID Proof Document (Aadhar/Voter ID)",
      docFileHint: "Ensure the photo is clear and readable. (PDF, JPG, PNG)",

      // Step 7: Completed Success
      successTitle: "Registration Submitted Successfully!",
      successSubtitle: "Your profile is under review by admin.",
      successDesc1: "Our support agents will review and verify your details within 24 to 48 hours.",
      successDesc2: "Once approved, your details will be listed publicly, allowing local employers to search and call you directly.",
      goHome: "Return to Homepage"
    }
  };

  // --- Initial Check on Mount ---
  useEffect(() => {
    // Check if token exists in local storage
    const storedToken = localStorage.getItem("labourToken");
    const storedUser = localStorage.getItem("labourUser");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      fetchCategories();
      fetchProfile(storedToken);
    } else {
      fetchCategories();
    }
  }, []);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Fetch skills based on category
  const fetchSkills = async (categoryId: string) => {
    if (!categoryId) return;
    try {
      const res = await fetch(`/api/categories/${categoryId}/skills`);
      const data = await res.json();
      if (data.success) {
        setSkills(data.data);
      }
    } catch (err) {
      console.error("Error fetching skills:", err);
    }
  };

  // Trigger skill fetching when categoryId changes
  useEffect(() => {
    if (formData.categoryId) {
      fetchSkills(formData.categoryId);
    } else {
      setSkills([]);
    }
  }, [formData.categoryId]);

  // Fetch existing labour profile if they return
  const fetchProfile = async (authToken: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/labour/profile", {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      const data = await res.json();
      if (data.success && data.data) {
        const profile = data.data;
        // Prefill form
        setFormData(prev => ({
          ...prev,
          fullName: profile.fullName || "",
          age: profile.age || undefined,
          gender: profile.gender || undefined,
          profileImage: profile.profileImage || "",
          homeAddress: profile.homeAddress || "",
          homeLatitude: profile.homeLatitude || undefined,
          homeLongitude: profile.homeLongitude || undefined,
          currentLocation: profile.currentLocation || "",
          currentLatitude: profile.currentLatitude || undefined,
          currentLongitude: profile.currentLongitude || undefined,
          preferredWorkLocation: profile.preferredWorkLocation || "",
          preferredWorkLatitude: profile.preferredWorkLatitude || undefined,
          preferredWorkLongitude: profile.preferredWorkLongitude || undefined,
          categoryId: profile.categoryId?._id || profile.categoryId || "",
          skills: profile.skills?.map((s: any) => s._id || s) || [],
          chargeAmount: profile.chargeAmount || undefined,
          chargeType: profile.chargeType || "day",
          availability: profile.availability || prev.availability,
          experience: profile.experience || "",
          workType: profile.workType || "Daily wage",
          additionalInfo: profile.additionalInfo || "",
          documentUrl: profile.documentUrl || "",
          documentType: profile.documentType || "Aadhar Card",
          adminApprovalStatus: profile.adminApprovalStatus
        }));

        // Determine step based on completion
        if (profile.isProfileCompleted) {
          setStep(7);
        } else if (!profile.fullName) {
          setStep(1);
        } else if (!profile.homeAddress) {
          setStep(2);
        } else if (!profile.categoryId) {
          setStep(3);
        } else if (!profile.chargeAmount) {
          setStep(4);
        } else if (!profile.availability) {
          setStep(5);
        } else {
          setStep(6);
        }
      } else {
        // Profile not created yet - start with Step 1
        setStep(1);
      }
    } catch (err) {
      console.log("No profile found yet, starting from scratch.");
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  // --- Step 0 OTP Authentication Actions ---

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber || mobileNumber.length !== 10) {
      setError(lang === "hi" ? "कृपया 10 अंकों का मोबाइल नंबर डालें" : "Please enter a valid 10-digit mobile number");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber })
      });
      const data = await res.json();
      if (data.success) {
        setOtpSent(true);
        if (data.otp) {
          setDemoOtp(data.otp.otp);
        }
        setSuccessMsg(lang === "hi" ? "OTP भेजा गया है।" : "OTP sent successfully.");
      } else {
        setError(data.message || "Failed to send OTP");
      }
    } catch (err: any) {
      setError(err.message || "Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode) {
      setError(lang === "hi" ? "कृपया OTP कोड डालें" : "Please enter the OTP");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      // 1. Verify OTP
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber, otp: otpCode })
      });
      const data = await res.json();
      
      if (data.success && data.data) {
        const { token: receivedToken, user: receivedUser } = data.data;
        
        // 2. Select role if null or not labour
        let finalUser = receivedUser;
        if (receivedUser.role !== "labour") {
          setSuccessMsg(t[lang].roleSetting);
          const roleRes = await fetch("/api/auth/select-role", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              Authorization: `Bearer ${receivedToken}`
            },
            body: JSON.stringify({ role: "labour" })
          });
          const roleData = await roleRes.json();
          if (roleData.success) {
            finalUser = roleData.data;
          } else {
            throw new Error(roleData.message || "Role selection failed");
          }
        }

        // 3. Save to localStorage & state
        localStorage.setItem("labourToken", receivedToken);
        localStorage.setItem("labourUser", JSON.stringify(finalUser));
        setToken(receivedToken);
        setUser(finalUser);
        setSuccessMsg(null);

        // 4. Fetch/Create labour profile
        await fetchProfile(receivedToken);
      } else {
        setError(data.message || "Invalid OTP code");
      }
    } catch (err: any) {
      setError(err.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("labourToken");
    localStorage.removeItem("labourUser");
    setToken(null);
    setUser(null);
    setStep(0);
    setOtpSent(false);
    setOtpCode("");
    setDemoOtp(null);
    setError(null);
    setSuccessMsg(null);
  };

  // --- Step 1 - 6 API Submission Actions ---

  const handleNextStep = async () => {
    if (!token) return;
    setError(null);
    setLoading(true);

    try {
      let endpoint = "";
      let body: any = {};

      if (step === 1) {
        if (!formData.fullName || !formData.age || !formData.gender) {
          throw new Error(lang === "hi" ? "कृपया सभी फ़ील्ड भरें" : "Please fill out all personal details");
        }
        endpoint = "/api/labour/personal-info";
        body = {
          fullName: formData.fullName,
          age: Number(formData.age),
          gender: formData.gender,
        };
      } 
      else if (step === 2) {
        if (!formData.homeAddress || !formData.currentLocation || !formData.preferredWorkLocation) {
          throw new Error(lang === "hi" ? "कृपया सभी पते भरें" : "Please fill out all address fields");
        }
        endpoint = "/api/labour/address-info";
        body = {
          homeAddress: formData.homeAddress,
          homeLatitude: formData.homeLatitude,
          homeLongitude: formData.homeLongitude,
          currentLocation: formData.currentLocation,
          currentLatitude: formData.currentLatitude,
          currentLongitude: formData.currentLongitude,
          preferredWorkLocation: formData.preferredWorkLocation,
          preferredWorkLatitude: formData.preferredWorkLatitude,
          preferredWorkLongitude: formData.preferredWorkLongitude,
        };
      }
      else if (step === 3) {
        if (!formData.categoryId) {
          throw new Error(lang === "hi" ? "कृपया कोई श्रेणी चुनें" : "Please select a category");
        }
        if (!formData.skills || formData.skills.length === 0) {
          throw new Error(lang === "hi" ? "कृपया कम से कम एक कौशल चुनें" : "Please select at least one skill");
        }
        endpoint = "/api/labour/work-info";
        body = {
          categoryId: formData.categoryId,
          skills: formData.skills,
        };
      }
      else if (step === 4) {
        if (!formData.chargeAmount || formData.chargeAmount <= 0) {
          throw new Error(lang === "hi" ? "कृपया सही रेट राशि भरें" : "Please enter a valid rate amount");
        }
        endpoint = "/api/labour/charge-info";
        body = {
          chargeAmount: Number(formData.chargeAmount),
          chargeType: formData.chargeType,
        };
      }
      else if (step === 5) {
        endpoint = "/api/labour/availability-info";
        body = {
          availability: formData.availability
        };
      }
      else if (step === 6) {
        if (!formData.experience) {
          throw new Error(lang === "hi" ? "कृपया काम का अनुभव साझा करें" : "Please describe your experience");
        }
        if (!formData.documentUrl) {
          throw new Error(lang === "hi" ? "कृपया अपना पहचान पत्र (दस्तावेज़) अपलोड करें" : "Please upload your ID document");
        }

        // Save experience details first
        const expRes = await fetch("/api/labour/experience-info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            experience: formData.experience,
            workType: formData.workType,
            additionalInfo: formData.additionalInfo
          })
        });
        const expData = await expRes.json();
        if (!expData.success) {
          throw new Error(expData.message || "Failed to save experience info");
        }

        // Then submit final registration status
        const submitRes = await fetch("/api/labour/submit-registration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            documentType: formData.documentType
          })
        });
        const submitData = await submitRes.json();
        if (submitData.success) {
          setStep(7);
          return;
        } else {
          throw new Error(submitData.message || "Failed to submit registration");
        }
      }

      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(body)
        });
        const resData = await res.json();
        if (resData.success) {
          setStep(prev => prev + 1);
        } else {
          throw new Error(resData.message || "Failed to save details");
        }
      }
    } catch (err: any) {
      setError(err.message || "Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  // --- Profile Image Upload ---
  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setError(null);
    setLoading(true);
    try {
      const data = new FormData();
      data.append("file", files[0]);

      const res = await fetch("/api/labour/upload-profile-image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: data
      });
      const resData = await res.json();
      if (resData.success) {
        setFormData(prev => ({ ...prev, profileImage: resData.imageUrl }));
        setSuccessMsg(lang === "hi" ? "फ़ोटो अपलोड हो गई है!" : "Photo uploaded successfully!");
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        throw new Error(resData.message || "Image upload failed");
      }
    } catch (err: any) {
      setError(err.message || "Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  // --- Identity Document Upload ---
  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError(null);
    setLoading(true);
    try {
      const data = new FormData();
      data.append("file", files[0]);

      const res = await fetch("/api/labour/upload-document", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: data
      });
      const resData = await res.json();
      if (resData.success) {
        setFormData(prev => ({ ...prev, documentUrl: resData.documentUrl }));
        setSuccessMsg(lang === "hi" ? "पहचान पत्र अपलोड हो गया है!" : "Document uploaded successfully!");
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        throw new Error(resData.message || "Document upload failed");
      }
    } catch (err: any) {
      setError(err.message || "Document upload failed");
    } finally {
      setLoading(false);
    }
  };

  // --- GPS Geo-location Capture ---
  const handleGetGPSLocation = () => {
    setError(null);
    if (!navigator.geolocation) {
      setError(lang === "hi" ? "आपके ब्राउज़र में GPS उपलब्ध नहीं है" : "GPS is not supported by your browser");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        let resolvedAddress = "";
        let resolvedCity = "";

        try {
          // Fetch reverse geocoded address from Nominatim (OpenStreetMap) matching the selected language
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=${lang}`
          );
          const geoData = await geoRes.json();
          if (geoData) {
            resolvedAddress = geoData.display_name || "";
            const addr = geoData.address || {};
            const cityOrTown = addr.city || addr.town || addr.village || addr.suburb || addr.neighbourhood || "";
            const state = addr.state || "";
            if (cityOrTown && state) {
              resolvedCity = `${cityOrTown}, ${state}`;
            } else if (cityOrTown) {
              resolvedCity = cityOrTown;
            } else if (state) {
              resolvedCity = state;
            }
          }
        } catch (geoErr) {
          console.error("Reverse geocoding error:", geoErr);
        }

        setFormData(prev => ({
          ...prev,
          homeLatitude: latitude,
          homeLongitude: longitude,
          currentLatitude: latitude,
          currentLongitude: longitude,
          preferredWorkLatitude: latitude,
          preferredWorkLongitude: longitude,
          homeAddress: resolvedAddress || prev.homeAddress,
          currentLocation: resolvedAddress || prev.currentLocation,
          preferredWorkLocation: resolvedCity || resolvedAddress || prev.preferredWorkLocation,
        }));
        setSuccessMsg(t[lang].gpsSuccess);
        setTimeout(() => setSuccessMsg(null), 3000);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError(t[lang].gpsError);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Toggle skills in Step 3
  const toggleSkill = (skillId: string) => {
    setFormData(prev => {
      const selected = prev.skills || [];
      if (selected.includes(skillId)) {
        return { ...prev, skills: selected.filter(id => id !== skillId) };
      } else {
        return { ...prev, skills: [...selected, skillId] };
      }
    });
  };

  // Toggle availability days
  const toggleDay = (day: keyof NonNullable<ProfileData["availability"]>) => {
    setFormData(prev => {
      const availability = { ...prev.availability } as NonNullable<ProfileData["availability"]>;
      availability[day] = !availability[day];
      return { ...prev, availability };
    });
  };

  // Render Step Names
  const stepTitles = [
    t[lang].authTitle,
    t[lang].step1Title,
    t[lang].step2Title,
    t[lang].step3Title,
    t[lang].step4Title,
    t[lang].step5Title,
    t[lang].step6Title,
  ];

  return (
    <div className="min-h-screen bg-[#F6F4EE] text-zinc-900 font-sans selection:bg-brand-green/20 dark:bg-zinc-950 dark:text-zinc-55 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
      
      {/* Top Header Card */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between mb-8 rounded-3xl bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:bg-zinc-900 dark:border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green text-white">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-lg font-black tracking-tight text-zinc-955 dark:text-white">
            Labour<span className="text-brand-green">Connect</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(prev => prev === "hi" ? "en" : "hi")}
            className="inline-flex items-center gap-1.5 rounded-2xl border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-bold text-zinc-700 hover:bg-zinc-105 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
          >
            <Languages className="h-3.5 w-3.5" />
            <span>{lang === "hi" ? "English" : "हिन्दी"}</span>
          </button>

          {/* Logout button (only show when authenticated) */}
          {token && (
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-2xl border border-rose-300 bg-rose-50 px-3.5 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-400"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>{t[lang].logout}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Form Box */}
      <main className="max-w-4xl mx-auto w-full flex-grow flex flex-col md:flex-row gap-8 items-stretch">
        
        {/* Left Column: Progress Sidebar (Desktop only) */}
        {step > 0 && step < 7 && (
          <aside className="w-full md:w-64 shrink-0 rounded-3xl bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:bg-zinc-900 dark:border-zinc-800 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-heading font-black text-lg text-zinc-950 dark:text-white border-b-2 border-dashed border-zinc-200 pb-2 dark:border-zinc-800">
                {lang === "hi" ? "पंजीकरण प्रगति" : "Onboarding Steps"}
              </h3>
              
              <ul className="space-y-3.5">
                {stepTitles.slice(1).map((title, i) => {
                  const stepIndex = i + 1;
                  const isCompleted = stepIndex < step;
                  const isActive = stepIndex === step;
                  
                  return (
                    <li key={stepIndex} className="flex items-center gap-3">
                      <span className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-black text-xs font-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]",
                        isCompleted && "bg-brand-green text-white",
                        isActive && "bg-yellow-400 text-black",
                        !isActive && !isCompleted && "bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500"
                      )}>
                        {isCompleted ? <Check className="h-4 w-4 stroke-[3]" /> : stepIndex}
                      </span>
                      <span className={cn(
                        "text-xs font-bold",
                        isActive && "text-zinc-950 font-black underline dark:text-white",
                        isCompleted && "text-zinc-500 line-through dark:text-zinc-400",
                        !isActive && !isCompleted && "text-zinc-400 dark:text-zinc-650"
                      )}>
                        {title}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-zinc-150 dark:border-zinc-800 text-center">
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">
                {t[lang].step} {step} / 6
              </span>
              <div className="h-2 w-full bg-zinc-100 rounded-full border border-black overflow-hidden mt-1.5 dark:bg-zinc-800">
                <div 
                  className="bg-brand-green h-full transition-all duration-300"
                  style={{ width: `${(step / 6) * 100}%` }}
                />
              </div>
            </div>
          </aside>
        )}

        {/* Right Column: Step Forms Card */}
        <section className="flex-grow rounded-3xl bg-white border-2 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:bg-zinc-900 dark:border-zinc-800 flex flex-col justify-between">
          <div>
            
            {/* Global Errors and Notifications */}
            {error && (
              <div className="mb-6 rounded-2xl border-2 border-black bg-rose-50 p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p className="text-sm font-bold">{error}</p>
              </div>
            )}

            {successMsg && (
              <div className="mb-6 rounded-2xl border-2 border-black bg-emerald-50 p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <p className="text-sm font-bold">{successMsg}</p>
              </div>
            )}

            {/* STEP 0: OTP LOGIN SCREEN */}
            {step === 0 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-black font-heading tracking-tight text-zinc-955 dark:text-white leading-tight">
                    {t[lang].authTitle}
                  </h1>
                  <p className="text-sm text-zinc-500 font-bold mt-1.5">
                    {t[lang].subtitle}
                  </p>
                </div>

                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                        {t[lang].phoneLabel}
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4.5 flex items-center text-zinc-400 font-black text-sm">
                          +91
                        </span>
                        <input
                          type="tel"
                          maxLength={10}
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                          placeholder={t[lang].phonePlaceholder}
                          className="block w-full pl-15 pr-4 py-3.5 text-base border-2 border-black rounded-2xl bg-zinc-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-white dark:bg-zinc-800 dark:text-white"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || mobileNumber.length !== 10}
                      className="w-full inline-flex justify-center items-center gap-2 py-4 rounded-2xl border-2 border-black bg-brand-green text-white font-black text-base shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4.5 w-4.5 animate-spin" />
                          <span>{t[lang].loading}</span>
                        </>
                      ) : (
                        <>
                          <span>{t[lang].sendOtpBtn}</span>
                          <ArrowRight className="h-5 w-5" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    {demoOtp && (
                      <div className="p-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-xl text-xs font-bold">
                        {t[lang].demoOtpAlert} <span className="underline select-all text-sm font-black">{demoOtp}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                        {t[lang].otpLabel}
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                        placeholder={t[lang].otpPlaceholder}
                        className="block w-full px-4 py-3.5 text-base border-2 border-black rounded-2xl bg-zinc-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-white dark:bg-zinc-800 dark:text-white"
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setOtpSent(false)}
                        className="w-1/3 py-4 rounded-2xl border-2 border-black bg-white text-zinc-950 font-black text-base shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                      >
                        {t[lang].back}
                      </button>
                      
                      <button
                        type="submit"
                        disabled={loading || otpCode.length < 4}
                        className="w-2/3 inline-flex justify-center items-center gap-2 py-4 rounded-2xl border-2 border-black bg-brand-green text-white font-black text-base shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-4.5 w-4.5 animate-spin" />
                            <span>{t[lang].loading}</span>
                          </>
                        ) : (
                          <>
                            <span>{t[lang].verifyBtn}</span>
                            <CheckCircle2 className="h-5 w-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* STEP 1: PERSONAL INFORMATION */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-black font-heading text-zinc-950 dark:text-white">
                    {t[lang].step1Title}
                  </h1>
                  <p className="text-sm text-zinc-500 font-bold">
                    {t[lang].step1Subtitle}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Photo Uploader */}
                  <div className="flex flex-col sm:flex-row items-center gap-5 p-4 border-2 border-black border-dashed rounded-2xl bg-zinc-50 dark:bg-zinc-800/50">
                    <div className="h-20 w-20 rounded-full border-2 border-black bg-zinc-200 overflow-hidden flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      {formData.profileImage ? (
                        <img 
                          src={formData.profileImage} 
                          alt="Profile Preview" 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <UserIcon className="h-10 w-10 text-zinc-400" />
                      )}
                    </div>
                    
                    <div className="flex-grow text-center sm:text-left">
                      <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                        {t[lang].photoLabel}
                      </label>
                      <p className="text-xs text-zinc-400 font-bold mb-3">{t[lang].photoHint}</p>
                      
                      <div className="relative inline-block">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfileImageUpload}
                          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        />
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black rounded-xl bg-white text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                        >
                          <Upload className="h-3.5 w-3.5" />
                          <span>{loading ? t[lang].uploading : (formData.profileImage ? "Change Photo" : "Choose Image")}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      {t[lang].fullNameLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={t[lang].fullNamePlaceholder}
                      className="block w-full px-4 py-3 border-2 border-black rounded-2xl bg-zinc-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-white dark:bg-zinc-800 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Age Input */}
                    <div>
                      <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        {t[lang].ageLabel}
                      </label>
                      <input
                        type="number"
                        value={formData.age || ""}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value ? Number(e.target.value) : undefined })}
                        placeholder={t[lang].agePlaceholder}
                        className="block w-full px-4 py-3 border-2 border-black rounded-2xl bg-zinc-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-white dark:bg-zinc-800 dark:text-white"
                      />
                    </div>

                    {/* Gender Select */}
                    <div>
                      <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        {t[lang].genderLabel}
                      </label>
                      <select
                        value={formData.gender || ""}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                        className="block w-full px-4 py-3 border-2 border-black rounded-2xl bg-zinc-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-white dark:bg-zinc-800 dark:text-white"
                      >
                        <option value="">{t[lang].selectOption}</option>
                        <option value="male">{t[lang].genderMale}</option>
                        <option value="female">{t[lang].genderFemale}</option>
                        <option value="other">{t[lang].genderOther}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: ADDRESS & GEOLOCATION COORDS */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-black font-heading text-zinc-955 dark:text-white">
                    {t[lang].step2Title}
                  </h1>
                  <p className="text-sm text-zinc-500 font-bold">
                    {t[lang].step2Subtitle}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* GPS Coordinates Button */}
                  <button
                    type="button"
                    onClick={handleGetGPSLocation}
                    disabled={loading}
                    className="w-full inline-flex justify-center items-center gap-2 py-3 border-2 border-black rounded-2xl bg-yellow-400 text-black font-black text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                  >
                    <Navigation className="h-4 w-4" />
                    <span>{t[lang].gpsBtn}</span>
                  </button>

                  {/* Lat/Long Small Indicator (for transparency) */}
                  {(formData.currentLatitude || formData.homeLatitude) && (
                    <div className="text-[10px] text-zinc-400 font-bold flex gap-4 px-1">
                      <span>🏠 Home GPS: {formData.homeLatitude?.toFixed(4)}, {formData.homeLongitude?.toFixed(4)}</span>
                      <span>📍 Work GPS: {formData.preferredWorkLatitude?.toFixed(4)}, {formData.preferredWorkLongitude?.toFixed(4)}</span>
                    </div>
                  )}

                  {/* Permanent Address */}
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      {t[lang].homeAddressLabel}
                    </label>
                    <textarea
                      rows={2}
                      value={formData.homeAddress}
                      onChange={(e) => setFormData({ ...formData, homeAddress: e.target.value })}
                      placeholder={t[lang].homeAddressPlaceholder}
                      className="block w-full px-4 py-3 border-2 border-black rounded-2xl bg-zinc-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-white dark:bg-zinc-800 dark:text-white"
                    />
                  </div>

                  {/* Current Address */}
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      {t[lang].currentLocationLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.currentLocation}
                      onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                      placeholder={t[lang].currentLocationPlaceholder}
                      className="block w-full px-4 py-3 border-2 border-black rounded-2xl bg-zinc-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-white dark:bg-zinc-800 dark:text-white"
                    />
                  </div>

                  {/* Preferred Work Location */}
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      {t[lang].preferredWorkLocationLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.preferredWorkLocation}
                      onChange={(e) => setFormData({ ...formData, preferredWorkLocation: e.target.value })}
                      placeholder={t[lang].preferredWorkLocationPlaceholder}
                      className="block w-full px-4 py-3 border-2 border-black rounded-2xl bg-zinc-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-white dark:bg-zinc-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: WORK CATEGORIES & SKILLS */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-black font-heading text-zinc-950 dark:text-white">
                    {t[lang].step3Title}
                  </h1>
                  <p className="text-sm text-zinc-500 font-bold">
                    {t[lang].step3Subtitle}
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Category Dropdown */}
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                      {t[lang].categoryLabel}
                    </label>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {categories.map((cat) => (
                        <button
                          key={cat._id}
                          type="button"
                          onClick={() => setFormData({ ...formData, categoryId: cat._id, skills: [] })}
                          className={cn(
                            "p-3 rounded-2xl border-2 border-black text-xs font-black text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer",
                            formData.categoryId === cat._id 
                              ? "bg-brand-green text-white animate-pulse-once" 
                              : "bg-zinc-50 hover:bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                          )}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Skills Checkboxes */}
                  {formData.categoryId && (
                    <div>
                      <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3">
                        {t[lang].skillsLabel}
                      </label>
                      
                      {skills.length === 0 ? (
                        <p className="text-xs text-zinc-400 font-bold italic">{t[lang].noSkillsInCategory}</p>
                      ) : (
                        <div className="flex flex-wrap gap-2.5">
                          {skills.map((skill) => {
                            const isSelected = formData.skills?.includes(skill._id);
                            return (
                              <button
                                key={skill._id}
                                type="button"
                                onClick={() => toggleSkill(skill._id)}
                                className={cn(
                                  "px-4 py-2 text-xs font-bold rounded-full border-2 border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer",
                                  isSelected 
                                    ? "bg-yellow-400 text-black border-black font-black" 
                                    : "bg-white text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                                )}
                              >
                                {isSelected ? "✓ " : ""}{skill.name}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 4: CHARGES & RATES */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-black font-heading text-zinc-950 dark:text-white">
                    {t[lang].step4Title}
                  </h1>
                  <p className="text-sm text-zinc-500 font-bold">
                    {t[lang].step4Subtitle}
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Charge Amount */}
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                      {t[lang].chargeAmountLabel}
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-4.5 flex items-center text-zinc-500 dark:text-zinc-400 font-black text-sm">
                        ₹
                      </span>
                      <input
                        type="number"
                        value={formData.chargeAmount || ""}
                        onChange={(e) => setFormData({ ...formData, chargeAmount: e.target.value ? Number(e.target.value) : undefined })}
                        placeholder={t[lang].chargeAmountPlaceholder}
                        className="block w-full pl-10 pr-4 py-3.5 text-base border-2 border-black rounded-2xl bg-zinc-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-white dark:bg-zinc-800 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Charge Type */}
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3">
                      {t[lang].chargeTypeLabel}
                    </label>
                    
                    <div className="grid grid-cols-2 gap-3.5">
                      {[
                        { val: "hour", label: t[lang].rateHour },
                        { val: "day", label: t[lang].rateDay },
                        { val: "week", label: t[lang].rateWeek },
                        { val: "month", label: t[lang].rateMonth }
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => setFormData({ ...formData, chargeType: item.val as any })}
                          className={cn(
                            "p-3 rounded-2xl border-2 border-black text-sm font-black text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer",
                            formData.chargeType === item.val
                              ? "bg-brand-green text-white"
                              : "bg-zinc-50 hover:bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                          )}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: WEEKLY AVAILABILITY */}
            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-black font-heading text-zinc-950 dark:text-white">
                    {t[lang].step5Title}
                  </h1>
                  <p className="text-sm text-zinc-500 font-bold">
                    {t[lang].step5Subtitle}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { key: "monday", label: t[lang].dayMonday },
                      { key: "tuesday", label: t[lang].dayTuesday },
                      { key: "wednesday", label: t[lang].dayWednesday },
                      { key: "thursday", label: t[lang].dayThursday },
                      { key: "friday", label: t[lang].dayFriday },
                      { key: "saturday", label: t[lang].daySaturday },
                      { key: "sunday", label: t[lang].daySunday },
                    ].map((day) => {
                      const isAvailable = formData.availability?.[day.key as keyof NonNullable<ProfileData["availability"]>] || false;
                      
                      return (
                        <button
                          key={day.key}
                          type="button"
                          onClick={() => toggleDay(day.key as any)}
                          className={cn(
                            "flex items-center justify-between p-4 rounded-2xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer text-sm font-black",
                            isAvailable 
                              ? "bg-brand-green text-white" 
                              : "bg-zinc-50 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                          )}
                        >
                          <span>{day.label}</span>
                          <span className={cn(
                            "h-5 w-5 rounded-full border-2 border-black flex items-center justify-center text-[10px] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]",
                            isAvailable ? "bg-yellow-400 text-black" : "bg-white"
                          )}>
                            {isAvailable ? "✓" : ""}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: EXPERIENCE & ID UPLOAD */}
            {step === 6 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-black font-heading text-zinc-955 dark:text-white">
                    {t[lang].step6Title}
                  </h1>
                  <p className="text-sm text-zinc-500 font-bold">
                    {t[lang].step6Subtitle}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Experience description */}
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      {t[lang].expLabel}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      placeholder={t[lang].expPlaceholder}
                      className="block w-full px-4 py-3 border-2 border-black rounded-2xl bg-zinc-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-white dark:bg-zinc-800 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Work Type */}
                    <div>
                      <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        {t[lang].workTypeLabel}
                      </label>
                      <select
                        value={formData.workType}
                        onChange={(e) => setFormData({ ...formData, workType: e.target.value })}
                        className="block w-full px-4 py-3 border-2 border-black rounded-2xl bg-zinc-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-white dark:bg-zinc-800 dark:text-white"
                      >
                        <option value="Daily wage">Daily wage (दैनिक मजदूरी)</option>
                        <option value="Full-time">Full-time (स्थायी काम)</option>
                        <option value="Part-time">Part-time (पार्ट-टाइम)</option>
                        <option value="Contract">Contract (ठेकेदारी पर)</option>
                      </select>
                    </div>

                    {/* Document Type selection */}
                    <div>
                      <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        {t[lang].docTypeLabel}
                      </label>
                      <select
                        value={formData.documentType}
                        onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
                        className="block w-full px-4 py-3 border-2 border-black rounded-2xl bg-zinc-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-white dark:bg-zinc-800 dark:text-white"
                      >
                        <option value="Aadhar Card">Aadhar Card (आधार कार्ड)</option>
                        <option value="Voter ID Card">Voter ID Card (वोटर आईडी)</option>
                        <option value="Driving License">Driving License (ड्राइविंग लाइसेंस)</option>
                        <option value="Labour Card">Labour Card (मजदूर कार्ड)</option>
                      </select>
                    </div>
                  </div>

                  {/* Document upload box */}
                  <div className="flex flex-col sm:flex-row items-center gap-5 p-4 border-2 border-black border-dashed rounded-2xl bg-zinc-50 dark:bg-zinc-800/50">
                    <div className="h-16 w-16 rounded-2xl border-2 border-black bg-zinc-200 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-zinc-500">
                      <FileText className="h-8 w-8" />
                    </div>

                    <div className="flex-grow text-center sm:text-left">
                      <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                        {t[lang].docFileLabel}
                      </label>
                      <p className="text-xs text-zinc-400 font-bold mb-3">{t[lang].docFileHint}</p>

                      <div className="relative inline-block">
                        <input
                          type="file"
                          accept=".pdf,image/*"
                          onChange={handleDocumentUpload}
                          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        />
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black rounded-xl bg-white text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                        >
                          <Upload className="h-3.5 w-3.5" />
                          <span>
                            {loading ? t[lang].uploading : (formData.documentUrl ? "Change Document File" : "Choose ID File")}
                          </span>
                        </button>
                      </div>

                      {formData.documentUrl && (
                        <div className="text-xs text-brand-green font-bold mt-2 truncate max-w-sm">
                          ✓ File: {formData.documentUrl.split("-").slice(1).join("-")}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Additional Info (optional) */}
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      {lang === "hi" ? "अतिरिक्त जानकारी (वैकल्पिक)" : "Additional Information (Optional)"}
                    </label>
                    <input
                      type="text"
                      value={formData.additionalInfo}
                      onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                      placeholder="e.g. Own my own mixer machine / self toolset"
                      className="block w-full px-4 py-3 border-2 border-black rounded-2xl bg-zinc-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-white dark:bg-zinc-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 7: REGISTRATION COMPLETED SCREEN */}
            {step === 7 && (
              <div className="space-y-6 py-6 text-center">
                <div className="flex justify-center">
                  <div className="h-20 w-20 rounded-full border-4 border-black bg-yellow-400 text-zinc-950 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <CheckCircle2 className="h-12 w-12 stroke-[3]" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl font-black font-heading text-zinc-955 dark:text-white">
                    {t[lang].successTitle}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-black bg-orange-100 text-orange-850 text-xs font-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] uppercase">
                    <Clock className="h-3 w-3" />
                    {t[lang].successSubtitle}
                  </span>
                  
                  <div className="max-w-md mx-auto space-y-2 mt-4 text-sm text-zinc-650 dark:text-zinc-400 font-bold leading-relaxed">
                    <p>{t[lang].successDesc1}</p>
                    <p>{t[lang].successDesc2}</p>
                  </div>
                </div>

                <div className="pt-6 border-t-2 border-dashed border-zinc-200 dark:border-zinc-800">
                  <a
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-black rounded-2xl bg-brand-green text-white font-black text-base shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                  >
                    {t[lang].goHome}
                  </a>
                </div>
              </div>
            )}

          </div>

          {/* Stepper Wizard Footer Controls */}
          {step > 0 && step < 7 && (
            <div className="flex items-center gap-4 mt-10 pt-6 border-t-2 border-dashed border-zinc-200 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => setStep(prev => prev - 1)}
                disabled={loading}
                className="w-1/3 inline-flex justify-center items-center gap-2 py-3 rounded-2xl border-2 border-black bg-white text-zinc-950 font-black text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer disabled:opacity-50"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>{t[lang].back}</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                disabled={loading}
                className="w-2/3 inline-flex justify-center items-center gap-2 py-3.5 rounded-2xl border-2 border-black bg-brand-green text-white font-black text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{t[lang].loading}</span>
                  </>
                ) : (
                  <>
                    <span>{step === 6 ? t[lang].submit : t[lang].next}</span>
                    {step === 6 ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                  </>
                )}
              </button>
            </div>
          )}

        </section>

      </main>

      {/* Mini Footer */}
      <footer className="text-center text-xs text-zinc-400 dark:text-zinc-600 font-bold mt-12">
        &copy; {new Date().getFullYear()} LabourConnect. All rights reserved.
      </footer>

    </div>
  );
}
