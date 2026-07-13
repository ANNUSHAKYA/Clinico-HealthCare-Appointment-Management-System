import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import {
  Brain, Stethoscope, AlertTriangle, CheckCircle, Info,
  ArrowRight, Loader2, Sparkles, Activity, RotateCcw
} from "lucide-react";

const SAMPLE_SYMPTOMS = [
  "chest pain and shortness of breath",
  "severe headache and dizziness",
  "skin rash and itching",
  "stomach pain and nausea",
  "joint pain and swelling",
];

const URGENCY_CONFIG = {
  High: {
    color: "#ef4444",
    bg: "#fef2f2",
    border: "#fecaca",
    icon: AlertTriangle,
    label: "High Priority",
    tip: "Please seek medical attention promptly or visit an emergency room.",
  },
  Medium: {
    color: "#f59e0b",
    bg: "#fffbeb",
    border: "#fde68a",
    icon: Activity,
    label: "Moderate Priority",
    tip: "Schedule an appointment within the next few days.",
  },
  Low: {
    color: "#16a34a",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    icon: CheckCircle,
    label: "Low Priority",
    tip: "Monitor your symptoms. Book a routine appointment when convenient.",
  },
};

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (symptoms.trim().length < 5) {
      setError("Please describe your symptoms in at least 5 characters.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const { data } = await API.post("/ai/symptom-check", { symptoms });
      setResult(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSymptoms("");
    setResult(null);
    setError("");
    setCharCount(0);
  };

  const urgency = result ? URGENCY_CONFIG[result.urgencyLevel] || URGENCY_CONFIG.Low : null;

  return (
    <div className="symptom-checker-page">
      {/* Hero Banner */}
      <section className="sc-hero">
        <div className="sc-hero-badge">
          <Sparkles size={14} />
          AI-Powered Analysis
        </div>
        <h1 className="sc-hero-title">
          Smart Symptom <span>Checker</span>
        </h1>
        <p className="sc-hero-sub">
          Describe your symptoms and our AI will suggest the right medical department,
          doctor type, and urgency level — instantly.
        </p>
      </section>

      <div className="container sc-body">
        <div className="sc-layout">
          {/* Left: Input Form */}
          <div className="sc-card sc-form-card">
            <div className="sc-card-header">
              <div className="sc-card-icon">
                <Brain size={22} />
              </div>
              <div>
                <h2>Describe Your Symptoms</h2>
                <p>Be as specific as possible for the best recommendations</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="sc-form">
              <div className="sc-textarea-wrap">
                <textarea
                  id="symptoms-input"
                  className="sc-textarea"
                  placeholder="e.g., I have been experiencing chest pain with difficulty breathing for the past 2 hours..."
                  value={symptoms}
                  onChange={(e) => {
                    setSymptoms(e.target.value);
                    setCharCount(e.target.value.length);
                    if (error) setError("");
                  }}
                  maxLength={500}
                  rows={6}
                />
                <span className="sc-char-count">{charCount}/500</span>
              </div>

              {error && (
                <div className="sc-error">
                  <AlertTriangle size={16} /> {error}
                </div>
              )}

              {/* Quick Examples */}
              <div className="sc-examples">
                <span className="sc-examples-label">Try an example:</span>
                <div className="sc-chips">
                  {SAMPLE_SYMPTOMS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className="sc-chip"
                      onClick={() => {
                        setSymptoms(s);
                        setCharCount(s.length);
                        setError("");
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sc-form-actions">
                <button
                  type="submit"
                  className="sc-submit-btn"
                  disabled={loading || symptoms.trim().length < 5}
                  id="analyze-symptoms-btn"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="sc-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Stethoscope size={18} />
                      Analyze Symptoms
                    </>
                  )}
                </button>
                {result && (
                  <button type="button" className="sc-reset-btn" onClick={handleReset}>
                    <RotateCcw size={16} /> Reset
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right: Result Panel */}
          <div className={`sc-result-panel ${result ? "sc-result-visible" : ""}`}>
            {!result && !loading && (
              <div className="sc-empty-state">
                <div className="sc-empty-icon">
                  <Activity size={40} />
                </div>
                <h3>Your AI Analysis</h3>
                <p>Enter your symptoms on the left and click "Analyze Symptoms" to receive an instant AI-powered recommendation.</p>
              </div>
            )}

            {loading && (
              <div className="sc-loading-state">
                <div className="sc-pulse-ring">
                  <Brain size={32} />
                </div>
                <p>AI is analyzing your symptoms...</p>
                <div className="sc-loading-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}

            {result && urgency && (
              <div className="sc-result" id="ai-result">
                {/* Urgency Badge */}
                <div
                  className="sc-urgency-badge"
                  style={{ background: urgency.bg, border: `1px solid ${urgency.border}`, color: urgency.color }}
                >
                  <urgency.icon size={18} />
                  <span>{urgency.label}</span>
                </div>

                {/* Department */}
                <div className="sc-result-row">
                  <div className="sc-result-label">Suggested Department</div>
                  <div className="sc-result-value sc-department">{result.department}</div>
                </div>

                {/* Doctor Type */}
                <div className="sc-result-row">
                  <div className="sc-result-label">Doctor Category</div>
                  <div className="sc-result-value">{result.doctorCategory}</div>
                </div>

                {/* Reasoning */}
                {result.reasoning && (
                  <div className="sc-reasoning">
                    <Info size={16} />
                    <p>{result.reasoning}</p>
                  </div>
                )}

                {/* Urgency tip */}
                <div
                  className="sc-urgency-tip"
                  style={{ background: urgency.bg, borderLeft: `4px solid ${urgency.color}` }}
                >
                  <urgency.icon size={15} style={{ color: urgency.color, flexShrink: 0 }} />
                  <p style={{ color: urgency.color }}>{urgency.tip}</p>
                </div>

                {/* CTA */}
                <Link to="/doctors" className="sc-cta-btn">
                  Find a {result.doctorCategory} <ArrowRight size={16} />
                </Link>

                {/* Disclaimer */}
                {result.disclaimer && (
                  <p className="sc-disclaimer">{result.disclaimer}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* How it works */}
        <section className="sc-how">
          <h2>How It Works</h2>
          <div className="sc-how-grid">
            {[
              { icon: "✍️", step: "1", title: "Describe Symptoms", desc: "Enter your symptoms in plain language — as detailed as you like." },
              { icon: "🤖", step: "2", title: "AI Analysis", desc: "Our Gemini-powered AI analyzes your symptoms against medical knowledge." },
              { icon: "🏥", step: "3", title: "Get Recommendation", desc: "Receive a suggested department, doctor type, and urgency level instantly." },
              { icon: "📅", step: "4", title: "Book Appointment", desc: "Use the recommendation to book the right doctor in one click." },
            ].map((item) => (
              <div key={item.step} className="sc-how-item">
                <div className="sc-how-emoji">{item.icon}</div>
                <div className="sc-how-step">Step {item.step}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
