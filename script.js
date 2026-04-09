* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary-blue: #2563eb;
    --secondary-blue: #1e40af;
    --light-blue: #3b82f6;
    --gradient-start: #1e3a8a;
    --gradient-end: #3b82f6;
    --bg-light: #f8f9fa;
    --bg-white: #ffffff;
    --text-dark: #1f2937;
    --text-gray: #6b7280;
    --border-color: #e5e7eb;
    --success: #10b981;
    --warning: #f59e0b;
    --danger: #ef4444;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%);
    min-height: 100vh;
    color: var(--text-dark);
}

/* Toolbar */
.toolbar {
    background: var(--bg-white);
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.toolbar-left h1 {
    color: var(--primary-blue);
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.toolbar-right {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.btn-new-task {
    background: linear-gradient(135deg, var(--primary-blue), var(--light-blue));
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    transition: all 0.3s;
}

.btn-new-task:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.profile {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--bg-light);
    border-radius: 20px;
}

.profile i {
    font-size: 1.5rem;
    color: var(--primary-blue);
}

.profile #user-name {
    font-weight: 600;
    color: var(--text-dark);
}

.btn-logout {
    background: none;
    border: none;
    color: var(--danger);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
}

.btn-logout:hover {
    background: rgba(239, 68, 68, 0.1);
}

/* Main Container */
.main-container {
    display: flex;
    height: calc(100vh - 70px);
}

/* Sidebar */
.sidebar {
    width: 260px;
    background: var(--bg-white);
    padding: 1.5rem;
    overflow-y: auto;
}

.sidebar nav {
    margin-bottom: 2rem;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    margin-bottom: 0.5rem;
    color: var(--text-dark);
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.3s;
}

.nav-item:hover {
    background: var(--bg-light);
    color: var(--primary-blue);
}

.nav-item.active {
    background: linear-gradient(135deg, var(--primary-blue), var(--light-blue));
    color: white;
}

.categories-section h3 {
    font-size: 0.875rem;
    text-transform: uppercase;
    color: var(--text-gray);
    margin-bottom: 1rem;
    font-weight: 600;
}

.category-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 1rem;
    margin-bottom: 0.25rem;
    color: var(--text-dark);
    text-decoration: none;
    border-radius: 6px;
    font-size: 0.9rem;
    transition: all 0.3s;
}

.category-item:hover {
    background: var(--bg-light);
    color: var(--primary-blue);
}

/* Main Content */
.content {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
    background: rgba(255,255,255,0.1);
}

.view {
    display: none;
}

.view.active {
    display: block;
}

.view h2 {
    color: white;
    margin-bottom: 1.5rem;
    font-size: 2rem;
}

/* Stats Grid */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.stat-card {
    background: var(--bg-white);
    padding: 1.5rem;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.stat-card i {
    font-size: 2.5rem;
    color: var(--primary-blue);
}

.stat-info h3 {
    font-size: 2rem;
    color: var(--text-dark);
    margin-bottom: 0.25rem;
}

.stat-info p {
    color: var(--text-gray);
    font-size: 0.875rem;
}

/* Buttons */
.btn-primary {
    background: linear-gradient(135deg, var(--primary-blue), var(--light-blue));
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: transform 0.2s;
}

.btn-primary:hover {
    transform: translateY(-2px);
}

.btn-secondary {
    background: var(--bg-light);
    color: var(--text-dark);
    border: 1px solid var(--border-color);
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
}

/* Widgets */
.widget {
    background: var(--bg-white);
    padding: 1.5rem;
    border-radius: 12px;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.widget h3 {
    color: var(--text-dark);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quick-add-section {
    background: var(--bg-white);
    padding: 1.5rem;
    border-radius: 12px;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.quick-add-section h3 {
    margin-bottom: 1rem;
    color: var(--text-dark);
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

/* Tasks List */
.tasks-list {
    background: var(--bg-white);
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.tasks-list-small {
    max-height: 400px;
    overflow-y: auto;
}

.task-item {
    padding: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    margin-bottom: 1rem;
    display: flex;
    gap: 1rem;
    align-items: start;
    transition: all 0.3s;
}

.task-item:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.task-item.completed {
    opacity: 0.6;
}

.task-checkbox {
    width: 20px;
    height: 20px;
    margin-top: 0.25rem;
    cursor: pointer;
}

.task-content {
    flex: 1;
}

.task-title {
    font-weight: 600;
    color: var(--text-dark);
    margin-bottom: 0.25rem;
}

.task-item.completed .task-title {
    text-decoration: line-through;
}

.task-meta {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 0.5rem;
}

.task-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
}

.badge-category {
    background: #dbeafe;
    color: var(--primary-blue);
}

.badge-priority-1 {
    background: #fee2e2;
    color: var(--danger);
}

.badge-priority-2 {
    background: #fef3c7;
    color: var(--warning);
}

.badge-priority-3 {
    background: #d1fae5;
    color: var(--success);
}

.task-actions {
    display: flex;
    gap: 0.5rem;
}

.task-actions button {
    padding: 0.5rem;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 1.1rem;
    color: var(--text-gray);
    transition: color 0.2s;
}

.task-actions button:hover {
    color: var(--primary-blue);
}

/* Filter Tabs */
.filter-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
}

.filter-btn {
    padding: 0.5rem 1.5rem;
    border: 2px solid white;
    background: transparent;
    color: white;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s;
}

.filter-btn.active {
    background: white;
    color: var(--primary-blue);
}

.view-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

/* Calendar */
.calendar {
    background: var(--bg-white);
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.calendar-month {
    margin-bottom: 2rem;
}

.calendar-month h3 {
    color: var(--primary-blue);
    margin-bottom: 1rem;
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;
}

.calendar-day-header {
    text-align: center;
    font-weight: 600;
    color: var(--text-gray);
    padding: 0.5rem;
}

.calendar-day {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
}

.calendar-day:hover {
    background: var(--bg-light);
}

.calendar-day.has-tasks {
    background: #dbeafe;
    color: var(--primary-blue);
    font-weight: 600;
}

.calendar-day.today {
    background: var(--primary-blue);
    color: white;
    font-weight: 600;
}

/* Charts */
.charts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
}

.chart-container {
    background: var(--bg-white);
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.chart-container h3 {
    color: var(--text-dark);
    margin-bottom: 1rem;
}

/* Modal */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 1000;
    align-items: center;
    justify-content: center;
}

.modal.active {
    display: flex;
}

.modal-content {
    background: var(--bg-white);
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
}

.modal-content.large {
    max-width: 600px;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-color);
}

.modal-header h2 {
    color: var(--text-dark);
    font-size: 1.5rem;
}

.close-btn {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: var(--text-gray);
}

.close-btn:hover {
    color: var(--text-dark);
}

/* Form Styles */
form {
    padding: 1.5rem;
}

.form-group {
    margin-bottom: 1.25rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--text-dark);
    font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    font-size: 1rem;
    font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--primary-blue);
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.modal-footer {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    padding: 1.5rem;
    border-top: 1px solid var(--border-color);
}

/* Utility Classes */
.empty-message {
    text-align: center;
    color: var(--text-gray);
    padding: 2rem;
}

.loading {
    text-align: center;
    color: var(--text-gray);
    padding: 2rem;
}

/* ========================================
   ANIMATIONS
   ======================================== */

/* 1. Page Load - Stagger Animation for Task Cards */
@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.task-item {
    animation: slideInUp 0.4s ease-out backwards;
}

/* Stagger delay for multiple tasks */
.task-item:nth-child(1) { animation-delay: 0.05s; }
.task-item:nth-child(2) { animation-delay: 0.1s; }
.task-item:nth-child(3) { animation-delay: 0.15s; }
.task-item:nth-child(4) { animation-delay: 0.2s; }
.task-item:nth-child(5) { animation-delay: 0.25s; }
.task-item:nth-child(6) { animation-delay: 0.3s; }
.task-item:nth-child(7) { animation-delay: 0.35s; }
.task-item:nth-child(8) { animation-delay: 0.4s; }
.task-item:nth-child(9) { animation-delay: 0.45s; }
.task-item:nth-child(10) { animation-delay: 0.5s; }

/* 2. Task Card Hover - Lift Effect */
.task-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
}

/* 3. Task Completion Animation */
@keyframes completeTask {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
        background: #d1fae5;
        border-color: #10b981;
    }
    100% {
        transform: scale(1);
    }
}

.task-item.completing {
    animation: completeTask 0.5s ease-out;
}

/* Strikethrough animation */
@keyframes strikethrough {
    from {
        text-decoration-color: transparent;
        text-decoration-thickness: 0px;
    }
    to {
        text-decoration-color: currentColor;
        text-decoration-thickness: 2px;
    }
}

.task-item.completed .task-title {
    animation: strikethrough 0.3s ease-out;
}

/* 4. Task Add Animation */
@keyframes slideInFromTop {
    from {
        opacity: 0;
        transform: translateY(-30px);
        max-height: 0;
    }
    to {
        opacity: 1;
        transform: translateY(0);
        max-height: 500px;
    }
}

.task-item.adding {
    animation: slideInFromTop 0.5s ease-out;
}

/* 5. Task Delete Animation */
@keyframes slideOutRight {
    from {
        opacity: 1;
        transform: translateX(0);
    }
    to {
        opacity: 0;
        transform: translateX(100%);
    }
}

.task-item.deleting {
    animation: slideOutRight 0.4s ease-out forwards;
}

/* 6. Button Animations */
.btn-new-task {
    position: relative;
    overflow: hidden;
}

.btn-new-task::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.5s, height 0.5s;
}

.btn-new-task:active::before {
    width: 300px;
    height: 300px;
}

/* Pulse animation for Add Task button */
@keyframes pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}

.btn-new-task.pulse {
    animation: pulse 2s infinite;
}

/* 7. Category Filter Animation */
.filter-btn {
    position: relative;
    overflow: hidden;
}

.filter-btn::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 3px;
    background: white;
    transition: width 0.3s ease-out, left 0.3s ease-out;
}

.filter-btn.active::after {
    width: 100%;
    left: 0;
}

/* Category switching fade */
@keyframes fadeSwitch {
    0% {
        opacity: 1;
        transform: scale(1);
    }
    50% {
        opacity: 0;
        transform: scale(0.95);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}

.tasks-list.switching {
    animation: fadeSwitch 0.5s ease-in-out;
}

/* 8. Form Input Focus Animation */
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    transform: scale(1.02);
    transition: all 0.3s ease;
}

/* 9. Modal Animation */
@keyframes modalFadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: translateY(-50px) scale(0.9);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.modal.active {
    animation: modalFadeIn 0.3s ease-out;
}

.modal.active .modal-content {
    animation: modalSlideIn 0.4s ease-out;
}

/* 10. Stats Card Load Animation */
@keyframes statCardPop {
    from {
        opacity: 0;
        transform: scale(0.8) translateY(20px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.stat-card {
    animation: statCardPop 0.5s ease-out backwards;
}

.stat-card:nth-child(1) { animation-delay: 0.1s; }
.stat-card:nth-child(2) { animation-delay: 0.2s; }
.stat-card:nth-child(3) { animation-delay: 0.3s; }
.stat-card:nth-child(4) { animation-delay: 0.4s; }

/* 11. Sidebar Navigation Hover */
.nav-item {
    position: relative;
}

.nav-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--primary-blue);
    transform: scaleY(0);
    transition: transform 0.3s ease;
}

.nav-item:hover::before,
.nav-item.active::before {
    transform: scaleY(1);
}

/* 12. Checkbox Animation */
@keyframes checkboxCheck {
    0% {
        transform: scale(0.8);
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
}

.task-checkbox:checked {
    animation: checkboxCheck 0.3s ease;
}

/* 13. Success Checkmark Animation */
@keyframes successCheck {
    0% {
        opacity: 0;
        transform: scale(0) rotate(-45deg);
    }
    50% {
        opacity: 1;
        transform: scale(1.2) rotate(-45deg);
    }
    100% {
        opacity: 1;
        transform: scale(1) rotate(0deg);
    }
}

/* 14. Loading Spinner Enhancement */
.loading {
    animation: fadeSwitch 0.5s ease-in-out;
}

/* 15. Button Ripple Effect */
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

/* Responsive */
@media (max-width: 768px) {
    .main-container {
        flex-direction: column;
    }

    .sidebar {
        width: 100%;
        height: auto;
    }

    .stats-grid {
        grid-template-columns: 1fr 1fr;
    }

    .charts-grid {
        grid-template-columns: 1fr;
    }

    .form-row {
        grid-template-columns: 1fr;
    }
    
    /* Reduce animation intensity on mobile */
    .task-item:hover {
        transform: none;
    }
}
