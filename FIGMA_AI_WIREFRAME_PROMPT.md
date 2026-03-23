# Figma AI — wireframe generation prompt (copy below the line)

**Published wireframes (high-fidelity):** [https://visor-unity-00479441.figma.site/](https://visor-unity-00479441.figma.site/) — *High-fidelity wireframes for School Dynamics* (Figma site).

---

**COPY EVERYTHING FROM HERE ↓**

Design **high-fidelity wireframes** (not low-fi sketches) for a web app called **School Dynamics** — school management software for schools in Uganda. Use a **clean, professional SaaS** aesthetic: plenty of white space, clear typography hierarchy, subtle borders, one accent color **crimson/red** (#C70039) for primary buttons and links, dark gray/near-black for sidebar on staff views, **teal** (#0D9488) as secondary accent for the parent portal. **Mobile-first responsive**: show **desktop (1440px)** and **mobile (390px)** versions for the landing page and at least one interior screen each for staff and parent flows.

**Product summary**  
One platform with **two entry points**: a **Staff portal** (full admin: students, fees in UGX, attendance, exams, messages) and a **Parent portal** (read-focused: fees, attendance, grades for their children only). Both start from the same **marketing/choice landing page**.

**Primary user flows to wireframe (in order)**

1. **Landing / choice** — Hero: product name “School Dynamics”, school subtitle “St. Mary’s School · Kampala, Uganda”, headline “Choose your portal”, short subtext. Two large **cards** side by side on desktop, stacked on mobile: **Staff portal** (CTA: Staff sign in) and **Parent portal** (CTA: Parent sign in). Footer with copyright line.

2. **Staff sign-in** — Centered card: logo, title “School Dynamics”, fields Work email + Password, primary button Sign in, small text link to parent portal.

3. **Staff dashboard (app shell)** — **Fixed left sidebar** (dark): logo, school name, nav items Dashboard, Students, Fees, Attendance, Exams, Messages, Settings, Log out at bottom. **Top bar**: location, links “Portals” and “Parent portal”, user name + role pill + **Log out**. **Main area**: page title “Dashboard”, subtitle with school name; **four stat cards** in a row (Active students, Present today, Fees outstanding, Exam records); below, **two columns**: panel “Attendance today” with list rows (name, class, Present/Absent badge), panel “Recent results” with subject and scores.

4. **Staff — Students list** — Same shell. Title “Students”, button “Add student”, **data table**: columns Admission, Name, Class, Guardian, Phone, Status, Open link.

5. **Staff — Fees** — Same shell. Title “Fees”, pill showing outstanding total, button “Add invoice”, table: Invoice, Student, Term, Amount, Paid, Balance, Due, Status.

6. **Parent sign-in** — Centered card: “Parent portal”, one field “Admission number or guardian phone”, button Continue, link to staff sign-in.

7. **Parent home (app shell)** — **Sidebar** (dark, similar to staff but nav: Home, Fees, Attendance, Grades, Log out). Teal accent for active nav if possible. **Top bar**: guardian/account label, Log out, link Portals. **Main**: Welcome, subtitle with learner count; **three small stat/quick-link cards**; section “Your learners” with cards or rows showing each child: name, class, fee balance, last attendance.

8. **Parent — Fees** — Same parent shell. Table of invoices for children only, total balance in a pill.

**Wireframe fidelity**  
Use **realistic placeholder text** (Ugandan names, UGX amounts, admission format SD-2024-001). Show **buttons, inputs, tables, badges** (Paid / Partial / Overdue, Present / Absent). Include **connector lines or a separate flow frame** showing: Landing → Staff login → Dashboard → Students OR Fees; Landing → Parent login → Parent home → Fees.

**Deliverable structure in Figma**  
One **“Flows”** page with labeled frames: `01-Landing-desktop`, `01-Landing-mobile`, `02-Staff-login`, `03-Staff-dashboard-desktop`, `04-Students`, `05-Fees`, `06-Parent-login`, `07-Parent-home-mobile`, `08-Parent-fees`. Use **auto-layout** on cards and tables for consistency.

**Do not** include lorem ipsum for headlines; use the real labels above. Keep **accessibility** in mind: sufficient contrast, visible focus states on primary actions.

**COPY ENDS HERE ↑**

---

## Tips after you paste into Figma AI

- If the model splits output, ask it to **continue** with “Parent portal screens and mobile landing.”
- If you use **Figma Make** or plugins, you may need to **iterate**: “Add mobile breakpoint for staff dashboard sidebar as a hamburger menu.”
- Export **PDF** or share **view link** for submissions that ask for Figma deliverables.
