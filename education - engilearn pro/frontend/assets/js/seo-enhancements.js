(function () {
  "use strict";

  var SITE_NAME = "EngiLearn";
  var DEFAULT_DESC = "EngiLearn is an engineering education platform for branch-wise subjects, video lectures, RGPV PYQ papers, most repeated questions, AI study tools, assignments, live classes, and LMS dashboards.";
  var ORIGIN = "https://engilearn-edu.vercel.app";
  var path = location.pathname.toLowerCase();

  var pages = [
    [/login\.html$/, "Login - EngiLearn", "Secure student, teacher, and admin login for EngiLearn.", "noindex, nofollow"],
    [/signup\.html$/, "Create Account - EngiLearn", "Create a verified EngiLearn student or teacher account.", "noindex, nofollow"],
    [/reset-password|forgot-password|otp|verify-otp/, "Account Verification - EngiLearn", "Secure EngiLearn OTP and password recovery.", "noindex, nofollow"],
    [/admin/, "Admin Dashboard - EngiLearn", "EngiLearn admin dashboard.", "noindex, nofollow"],
    [/dashboard/, "Student Dashboard - EngiLearn", "EngiLearn student dashboard.", "noindex, nofollow"],
    [/teacher/, "Teacher Dashboard - EngiLearn", "EngiLearn teacher dashboard.", "noindex, nofollow"],
    [/branch/, "RGPV Complete Branches - EngiLearn", "Explore RGPV engineering branches with semester-wise subject and academic resources.", "index, follow"],
    [/lecture|subscriber-video/, "Video Lectures - EngiLearn", "Watch engineering video lectures inside EngiLearn by branch, semester, and subject.", "index, follow"],
    [/pyq|pdf-viewer/, "RGPV PYQ Papers - EngiLearn", "Find RGPV previous year question papers by branch, semester, subject code, and year.", "index, follow"],
    [/repeated-questions/, "Most Repeated Questions - EngiLearn", "Study unit-wise most repeated questions for RGPV engineering subjects.", "index, follow"]
  ];

  function pick() {
    for (var i = 0; i < pages.length; i += 1) {
      if (pages[i][0].test(path)) return pages[i];
    }
    return [/.*/, "EngiLearn - Engineering Lectures, RGPV PYQ, AI Tools and LMS", DEFAULT_DESC, "index, follow"];
  }

  function meta(name, value, attr) {
    attr = attr || "name";
    var selector = "meta[" + attr + "='" + name + "']";
    var el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute("content", value);
  }

  function link(rel, href) {
    var el = document.head.querySelector("link[rel='" + rel + "']");
    if (!el) {
      el = document.createElement("link");
      el.rel = rel;
      document.head.appendChild(el);
    }
    el.href = href;
  }

  function jsonLd(id, data) {
    var el = document.getElementById(id);
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = id;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
  }

  var page = pick();
  var title = page[1];
  var desc = page[2] || DEFAULT_DESC;
  var canonical = ORIGIN + location.pathname.replace(/^\/frontend/, "") + location.search;

  document.title = title;
  meta("description", desc);
  meta("robots", page[3] || "index, follow");
  meta("author", SITE_NAME);
  meta("theme-color", "#0b0b0b");
  meta("og:site_name", SITE_NAME, "property");
  meta("og:title", title, "property");
  meta("og:description", desc, "property");
  meta("og:type", "website", "property");
  meta("og:url", canonical, "property");
  meta("og:image", ORIGIN + "/assets/icons/social-preview.svg", "property");
  meta("twitter:card", "summary_large_image");
  meta("twitter:title", title);
  meta("twitter:description", desc);
  meta("twitter:image", ORIGIN + "/assets/icons/social-preview.svg");
  link("canonical", canonical);
  link("manifest", "/manifest.json");
  link("icon", "/assets/icons/favicon.svg");
  link("apple-touch-icon", "/assets/icons/apple-touch-icon.svg");

  jsonLd("engilearn-org-schema", {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": SITE_NAME,
    "url": ORIGIN,
    "description": DEFAULT_DESC,
    "sameAs": []
  });

  jsonLd("engilearn-website-schema", {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": ORIGIN,
    "potentialAction": {
      "@type": "SearchAction",
      "target": ORIGIN + "/pages/pyq.html?subject={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  });

  jsonLd("engilearn-page-schema", {
    "@context": "https://schema.org",
    "@type": path.indexOf("lecture") > -1 || path.indexOf("pyq") > -1 || path.indexOf("repeated-questions") > -1 ? "LearningResource" : "WebPage",
    "name": title,
    "description": desc,
    "url": canonical,
    "isPartOf": { "@type": "WebSite", "name": SITE_NAME, "url": ORIGIN }
  });

  document.addEventListener("DOMContentLoaded", function () {
    if (!document.querySelector(".skip-to-content")) {
      var skip = document.createElement("a");
      skip.className = "skip-to-content";
      skip.href = "#main-content";
      skip.textContent = "Skip to content";
      document.body.insertBefore(skip, document.body.firstChild);
    }
    var main = document.querySelector("main") || document.querySelector(".main-content") || document.querySelector("#home");
    if (main && !main.id) main.id = "main-content";
    document.querySelectorAll("img:not([loading])").forEach(function (img) { img.loading = "lazy"; });
    document.querySelectorAll("iframe:not([loading])").forEach(function (frame) { frame.loading = "lazy"; });
    document.querySelectorAll("img:not([alt])").forEach(function (img) { img.alt = SITE_NAME + " visual"; });
    document.querySelectorAll("a[target='_blank']").forEach(function (a) { a.rel = "noopener noreferrer"; });
    document.querySelectorAll("button:not([aria-label])").forEach(function (button) {
      var text = (button.textContent || button.title || "Action").trim();
      if (text) button.setAttribute("aria-label", text);
    });
  });
})();
