/**
 * Honeygold India - Jim Corbett Booking & Ticket Generation Script
 * Handles form validation, generates booking tickets, and formats WhatsApp redirects.
 * Exposes a global Custom Trip Planner Modal dynamically.
 */

$(document).ready(function () {
    const DEFAULT_WHATSAPP_NUMBER = "919419045656"; // Honeygold primary contact
    
    // Inject Custom Trip Modal Styles
    const modalStyles = `
        <style>
            .hg-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(5px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 99999;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease;
            }
            .hg-modal-overlay.active {
                opacity: 1;
                pointer-events: auto;
            }
            .hg-modal-card {
                background: #fff;
                padding: 35px;
                border-radius: 16px;
                max-width: 650px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0px 10px 40px rgba(0,0,0,0.3);
                position: relative;
                transform: translateY(-20px);
                transition: transform 0.3s ease;
                border-top: 6px solid #FD7E21;
            }
            .hg-modal-overlay.active .hg-modal-card {
                transform: translateY(0);
            }
            .hg-modal-close {
                position: absolute;
                top: 15px;
                right: 20px;
                font-size: 30px;
                font-weight: 700;
                color: #696969;
                cursor: pointer;
                background: none;
                border: none;
                line-height: 1;
            }
            .hg-modal-close:hover {
                color: #FD7E21;
            }
            .hg-form-group {
                margin-bottom: 15px;
            }
            .hg-form-group label {
                font-weight: 700;
                color: #151515;
                margin-bottom: 5px;
                display: block;
                font-size: 14px;
            }
            .hg-form-control {
                width: 100%;
                padding: 10px 14px;
                border: 1px solid #C9C9C9;
                border-radius: 8px;
                font-size: 14px;
                background: #fff;
            }
            .hg-form-control:focus {
                border-color: #FD7E21;
                outline: none;
            }
            .hg-checkbox-group {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
                gap: 10px;
                margin-top: 5px;
            }
            .hg-checkbox-item {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 13px;
                color: #555;
                cursor: pointer;
            }
            .hg-checkbox-item input {
                accent-color: #FD7E21;
                cursor: pointer;
            }
            .hg-submit-btn {
                background: #FD7E21;
                color: #fff;
                font-weight: 700;
                padding: 12px 30px;
                border-radius: 30px;
                border: none;
                cursor: pointer;
                transition: all 0.3s ease;
                display: inline-block;
                width: 100%;
                margin-top: 10px;
                box-shadow: 0px 4px 15px rgba(253, 126, 33, 0.2);
            }
            .hg-submit-btn:hover {
                background: #e66d13;
                transform: translateY(-2px);
            }
        </style>
    `;
    $('head').append(modalStyles);

    // Inject Custom Trip Modal Markup
    const modalMarkup = `
        <div id="custom-trip-modal" class="hg-modal-overlay">
            <div class="hg-modal-card">
                <button class="hg-modal-close" id="close-custom-trip">&times;</button>
                <div style="text-align: center; margin-bottom: 25px;">
                    <h3 style="font-weight: 800; color: #151515; margin: 0;">Customize Your Corbett Trip</h3>
                    <p style="color: #696969; font-size: 13px; margin-top: 5px;">Plan your perfect itinerary. We'll generate a custom quote ticket and direct you to WhatsApp.</p>
                </div>
                <form class="hg-booking-form contact-form-items" id="custom-trip-form">
                    <input type="hidden" name="form_type" value="custom_trip">
                    <div class="row">
                        <div class="col-md-6 hg-form-group">
                            <label>Full Name *</label>
                            <input type="text" name="name" required class="hg-form-control" placeholder="Enter Full Name">
                        </div>
                        <div class="col-md-6 hg-form-group">
                            <label>WhatsApp Number *</label>
                            <input type="tel" name="phone" required class="hg-form-control" placeholder="e.g. +91 99999 99999">
                        </div>
                        <div class="col-md-6 hg-form-group">
                            <label>Email Address</label>
                            <input type="email" name="email" class="hg-form-control" placeholder="Enter Email Address">
                        </div>
                        <div class="col-md-6 hg-form-group">
                            <label>Preferred Date *</label>
                            <input type="date" name="date" required class="hg-form-control">
                        </div>
                        <div class="col-md-6 hg-form-group">
                            <label>Accommodation Star Rating</label>
                            <select name="star_rating" class="hg-form-control" style="height: 45px;">
                                <option value="3-Star (Standard)">3-Star (Standard Comfort)</option>
                                <option value="4-Star (Deluxe)">4-Star (Premium Luxury)</option>
                                <option value="5-Star (Elite Resorts)">5-Star (Elite Riverside Resort)</option>
                                <option value="Government Rest House (Dhikala)">Forest Rest House (Core Zone)</option>
                            </select>
                        </div>
                        <div class="col-md-6 hg-form-group">
                            <label>Total Travelers</label>
                            <select name="guests" class="hg-form-control" style="height: 45px;">
                                <option value="1">1 Person</option>
                                <option value="2">2 Persons</option>
                                <option value="3-4">3 - 4 Persons</option>
                                <option value="5-6">5 - 6 Persons</option>
                                <option value="6+">More than 6 Persons</option>
                            </select>
                        </div>
                        <div class="col-md-6 hg-form-group">
                            <label>Meal Plan Preference</label>
                            <select name="meal_plan" class="hg-form-control" style="height: 45px;">
                                <option value="Breakfast Only (CP)">Breakfast Only (CP)</option>
                                <option value="Half Board (MAP - Breakfast + Dinner)">Half Board (Breakfast + Dinner)</option>
                                <option value="Full Board (AP - All Meals)">Full Board (All Meals Included)</option>
                            </select>
                        </div>
                        <div class="col-md-6 hg-form-group">
                            <label>Trip Type / Joining Option</label>
                            <select name="trip_type" class="hg-form-control" style="height: 45px;">
                                <option value="Private Custom Trip">Private Custom Trip (Family/Solo)</option>
                                <option value="Hosted Group Departure">Join Hosted Group Departure (Solo/Duo travellers)</option>
                                <option value="Solo/Duo Traveler Cost-Share">Open to Share gypsy/resort (Match with others)</option>
                            </select>
                        </div>
                        <div class="col-md-6 hg-form-group">
                            <label>Join Group Preferences</label>
                            <div class="hg-checkbox-group">
                                <label class="hg-checkbox-item" style="grid-column: span 2;"><input type="checkbox" name="group_share_opt" value="Yes" checked> Allow Honeygold to match me with other solo/duo travellers to split gypsy safari costs</label>
                            </div>
                        </div>
                        <div class="col-md-6 hg-form-group">
                            <label>Activities & Safaris Included</label>
                            <div class="hg-checkbox-group">
                                <label class="hg-checkbox-item"><input type="checkbox" name="activities[]" value="Jeep Safari"> Jeep Safari</label>
                                <label class="hg-checkbox-item"><input type="checkbox" name="activities[]" value="Canter Safari"> Canter Safari</label>
                                <label class="hg-checkbox-item"><input type="checkbox" name="activities[]" value="River Rafting"> River Rafting</label>
                                <label class="hg-checkbox-item"><input type="checkbox" name="activities[]" value="Nature Trek"> Nature Trek</label>
                            </div>
                        </div>
                        <div class="col-12 hg-form-group">
                            <label>Custom Itinerary Requests / Notes</label>
                            <textarea name="message" class="hg-form-control" placeholder="Specify any custom requests, specific resort names, dietary requirements, etc." style="height: 80px;"></textarea>
                        </div>
                        <div class="col-12 mt-2">
                            <button type="submit" class="hg-submit-btn">Generate Ticket & Plan My Trip</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `;
    $('body').append(modalMarkup);

    // Event triggers to Open Modal
    $(document).on("click", ".custom-trip-btn, [href='#custom-trip-modal']", function (e) {
        e.preventDefault();
        $("#custom-trip-modal").addClass("active");
        
        // Auto-select trip type if group trip button clicked
        if ($(this).hasClass("group-trip-btn") || $(this).data("trip-type") === "group") {
            $("#custom-trip-form").find('select[name="trip_type"]').val("Hosted Group Departure");
        } else {
            $("#custom-trip-form").find('select[name="trip_type"]').val("Private Custom Trip");
        }
    });

    // Close Modal
    $(document).on("click", "#close-custom-trip, #custom-trip-modal", function (e) {
        if (e.target.id === "custom-trip-modal" || e.target.id === "close-custom-trip" || $(e.target).hasClass("hg-modal-close")) {
            $("#custom-trip-modal").removeClass("active");
        }
    });

    // Form Submit Interceptor
    $(document).on("submit", ".hg-booking-form", function (e) {
        e.preventDefault();
        
        const form = $(this);
        const name = form.find('input[name="name"]').val() || "";
        const phone = form.find('input[name="phone"]').val() || "";
        const email = form.find('input[name="email"]').val() || "";
        const date = form.find('input[name="date"]').val() || "";
        const guests = form.find('select[name="guests"]').val() || "1";
        const message = form.find('textarea[name="message"]').val() || "No additional requests.";
        
        if (!name || !phone) {
            alert("Please fill in your Name and WhatsApp Phone Number.");
            return;
        }

        // Generate Ticket
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        let isGroup = false;
        if (form.attr('id') === 'custom-trip-form' || form.find('input[name="form_type"]').val() === 'custom_trip') {
            const tripType = form.find('select[name="trip_type"]').val() || "Private Custom Trip";
            if (tripType !== "Private Custom Trip") {
                isGroup = true;
            }
        }
        const ticketNumber = isGroup ? `HG-JC-GRP-${randomNum}` : `HG-JC-${randomNum}`;

        let service = form.find('select[name="service"]').val() || "General Enquiry";
        let waMessage = "";

        // Check if form is Custom Trip Modal
        if (form.attr('id') === 'custom-trip-form' || form.find('input[name="form_type"]').val() === 'custom_trip') {
            const hotelStar = form.find('select[name="star_rating"]').val() || "Not specified";
            const mealPlan = form.find('select[name="meal_plan"]').val() || "Not specified";
            const tripType = form.find('select[name="trip_type"]').val() || "Private Custom Trip";
            const matchCoTraveller = form.find('input[name="group_share_opt"]').is(':checked') ? "Yes (Share Gypsy/Resort)" : "No (Private Only)";
            
            // Gather checkboxes
            let selectedActs = [];
            form.find('input[name="activities[]"]:checked').each(function() {
                selectedActs.push($(this).val());
            });
            const activitiesStr = selectedActs.length > 0 ? selectedActs.join(", ") : "None";

            service = `Customized Trip (${tripType})`;

            waMessage = 
`Hello Honeygold India,

I would like to book a *Customized Corbett Trip*.

🎫 *Ticket Number*: ${ticketNumber}
👤 *Name*: ${name}
📞 *WhatsApp*: ${phone}
📧 *Email*: ${email}
📅 *Preferred Date*: ${date}
👥 *Travelers Count*: ${guests}
✈️ *Trip Type*: ${tripType}
🤝 *Match Co-Travellers*: ${matchCoTraveller}
🏨 *Hotel Level*: ${hotelStar}
🍽️ *Meal Plan*: ${mealPlan}
🏕️ *Activities*: ${activitiesStr}
💬 *Notes/Requests*: ${message}

Please share a customized itinerary & quote. Thank you!`;
        } else {
            // Standard Form Message
            waMessage = 
`Hello Honeygold India,

I would like to book a service for *Jim Corbett*.

🎫 *Ticket Number*: ${ticketNumber}
👤 *Name*: ${name}
📞 *WhatsApp*: ${phone}
📧 *Email*: ${email}
📅 *Preferred Date*: ${date}
👥 *Number of Guests*: ${guests}
🏕️ *Service Type*: ${service}
💬 *Message/Notes*: ${message}

Please confirm the availability. Thank you!`;
        }

        // Save Booking Data
        const bookingData = {
            ticketNumber,
            name,
            phone,
            email,
            date,
            guests,
            service,
            message,
            timestamp: new Date().toLocaleString()
        };
        localStorage.setItem("latest_hg_booking", JSON.stringify(bookingData));

        // Close modal if open
        $("#custom-trip-modal").removeClass("active");

        // WhatsApp redirect
        const encodedMessage = encodeURIComponent(waMessage);
        const whatsappUrl = `https://wa.me/${DEFAULT_WHATSAPP_NUMBER}?text=${encodedMessage}`;
        
        showConfirmationModal(bookingData, whatsappUrl);
    });

    function showConfirmationModal(booking, redirectUrl) {
        const modalHtml = `
            <div id="hg-confirmation-modal" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(3px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 999999;
                font-family: sans-serif;
            ">
                <div style="
                    background: #fff;
                    padding: 30px;
                    border-radius: 12px;
                    max-width: 500px;
                    width: 90%;
                    box-shadow: 0px 4px 20px rgba(0,0,0,0.25);
                    text-align: center;
                    position: relative;
                ">
                    <div style="color: #63AB45; font-size: 50px; margin-bottom: 10px;">✓</div>
                    <h3 style="margin-top: 0; color: #151515; font-weight: 700;">Booking Ticket Generated!</h3>
                    <p style="color: #696969; font-size: 14px; margin-bottom: 20px;">Your ticket has been registered. To complete your booking, please send this ticket details to Honeygold via WhatsApp.</p>
                    
                    <div style="
                        background: #F7F7F7;
                        border: 1px dashed #C9C9C9;
                        padding: 15px;
                        border-radius: 8px;
                        margin-bottom: 25px;
                        text-align: left;
                        font-size: 14px;
                    ">
                        <strong>Ticket ID:</strong> <span style="color: #FD7E21; font-weight: 700;">${booking.ticketNumber}</span><br>
                        <strong>Name:</strong> ${booking.name}<br>
                        <strong>Service:</strong> ${booking.service}<br>
                        <strong>Date:</strong> ${booking.date || 'Not specified'}<br>
                        <strong>Guests/Travelers:</strong> ${booking.guests}
                    </div>

                    <a href="${redirectUrl}" target="_blank" id="send-whatsapp-btn" style="
                        background: #25D366;
                        color: #fff;
                        text-decoration: none;
                        padding: 12px 25px;
                        border-radius: 30px;
                        font-weight: 600;
                        display: inline-flex;
                        align-items: center;
                        gap: 10px;
                        margin-bottom: 15px;
                        box-shadow: 0px 4px 10px rgba(37,211,102,0.3);
                    ">
                        <i class="fab fa-whatsapp" style="font-size: 18px;"></i> Send Ticket via WhatsApp
                    </a>
                    
                    <button id="close-hg-modal" style="
                        background: transparent;
                        border: none;
                        color: #696969;
                        font-size: 12px;
                        cursor: pointer;
                        display: block;
                        margin: 0 auto;
                        text-decoration: underline;
                    ">Close Window</button>
                </div>
            </div>
        `;
        
        $('body').append(modalHtml);
        
        setTimeout(function() {
            window.open(redirectUrl, '_blank');
        }, 1500);
    }
    
    $(document).on("click", "#close-hg-modal", function () {
        $("#hg-confirmation-modal").remove();
    });
});
