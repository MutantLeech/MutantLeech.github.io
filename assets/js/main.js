(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$nav = $('#nav'),
		$main = $('#main'),
		$navPanelToggle, $navPanel, $navPanelInner;

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				$bg = $('<div class="bg"></div>').appendTo($t),
				on, off;

			on = function() {

				$bg
					.removeClass('fixed')
					.css('transform', 'matrix(1,0,0,1,0,0)');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$bg.css('transform', 'matrix(1,0,0,1,0,' + (pos * intensity) + ')');

					});

			};

			off = function() {

				$bg
					.addClass('fixed')
					.css('transform', 'none');

				$window
					.off('scroll._parallax');

			};

			// Disable parallax on ..
				if (browser.name == 'ie'			// IE
				||	browser.name == 'edge'			// Edge
				||	window.devicePixelRatio > 1		// Retina/HiDPI (= poor performance)
				||	browser.mobile)					// Mobile devices
					off();

			// Enable everywhere else.
				else {

					breakpoints.on('>large', on);
					breakpoints.on('<=large', off);

				}

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly').scrolly();

	// Background.
		$wrapper._parallax(0.925);

	// Nav Panel.

		// Toggle.
			$navPanelToggle = $(
				'<a href="#navPanel" id="navPanelToggle">Menu</a>'
			)
				.appendTo($wrapper);

			// Change toggle styling once we've scrolled past the header.
				$header.scrollex({
					bottom: '5vh',
					enter: function() {
						$navPanelToggle.removeClass('alt');
					},
					leave: function() {
						$navPanelToggle.addClass('alt');
					}
				});

		// Panel.
			$navPanel = $(
				'<div id="navPanel">' +
					'<nav>' +
					'</nav>' +
					'<a href="#navPanel" class="close"></a>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-navPanel-visible'
				});

			// Get inner.
				$navPanelInner = $navPanel.children('nav');

			// Move nav content on breakpoint change.
				var $navContent = $nav.children();

				breakpoints.on('>medium', function() {

					// NavPanel -> Nav.
						$navContent.appendTo($nav);

					// Flip icon classes.
						$nav.find('.icons, .icon')
							.removeClass('alt');

				});

				breakpoints.on('<=medium', function() {

					// Nav -> NavPanel.
						$navContent.appendTo($navPanelInner);

					// Flip icon classes.
						$navPanelInner.find('.icons, .icon')
							.addClass('alt');

				});

			// Hack: Disable transitions on WP.
				if (browser.os == 'wp'
				&&	browser.osVersion < 10)
					$navPanel
						.css('transition', 'none');

	// Intro.
		var $intro = $('#intro');

		if ($intro.length > 0) {

			// Hack: Fix flex min-height on IE.
				if (browser.name == 'ie') {
					$window.on('resize.ie-intro-fix', function() {

						var h = $intro.height();

						if (h > $window.height())
							$intro.css('height', 'auto');
						else
							$intro.css('height', h);

					}).trigger('resize.ie-intro-fix');
				}

			// Hide intro on scroll (> small).
				breakpoints.on('>small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'bottom',
						top: '25vh',
						bottom: '-50vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

				});

			// Hide intro on scroll (<= small).
				breakpoints.on('<=small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'middle',
						top: '15vh',
						bottom: '-15vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

			});

		}

		document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       TOKEN GENERATOR
    ===================================================== */
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()-_=+[]{};:,.<>?/";

    const lengthSlider = document.getElementById("token-length");
    const lengthValue = document.getElementById("length-value");
    const tokenOutput = document.getElementById("token-output");

    function generateToken() {
        if (!lengthSlider || !tokenOutput) return;

        let chars = "";
        if (document.getElementById("opt-upper")?.checked) chars += upperChars;
        if (document.getElementById("opt-lower")?.checked) chars += lowerChars;
        if (document.getElementById("opt-numbers")?.checked) chars += numberChars;
        if (document.getElementById("opt-symbols")?.checked) chars += symbolChars;

        if (!chars) {
            tokenOutput.value = "";
            return;
        }

        let token = "";
        for (let i = 0; i < lengthSlider.value; i++) {
            token += chars[Math.floor(Math.random() * chars.length)];
        }

        tokenOutput.value = token;
    }

    lengthSlider?.addEventListener("input", () => {
        lengthValue.textContent = lengthSlider.value;
        generateToken();
    });

    document.querySelectorAll(".options input").forEach(cb =>
        cb.addEventListener("change", generateToken)
    );

    document.getElementById("regen-token")?.addEventListener("click", generateToken);
    document.getElementById("copy-token")?.addEventListener("click", () => {
        navigator.clipboard.writeText(tokenOutput.value);
    });

    generateToken();


    /* =====================================================
       TOOL NAVIGATION
    ===================================================== */
    const toolLinks = document.querySelectorAll(".tool-link");
    const toolContents = document.querySelectorAll(".tool-content");

    toolLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();

            toolLinks.forEach(l => l.classList.remove("active"));
            toolContents.forEach(c => c.classList.remove("active"));

            link.classList.add("active");
            const toolId = link.dataset.tool;
            document.getElementById(toolId)?.classList.add("active");
        });
    });


    /* =====================================================
       SIDEBAR TOGGLE (MOBILE)
    ===================================================== */
    const toolsToggle = document.getElementById("tools-toggle");
    const sidebar = document.querySelector(".sidebar");

    toolsToggle?.addEventListener("click", () => {
        sidebar.classList.toggle("open");
    });

    document.querySelectorAll(".tool-link").forEach(link => {
        link.addEventListener("click", () => sidebar.classList.remove("open"));
    });


    /* =====================================================
       QR CODE GENERATOR
    ===================================================== */
    window.generateQRCode = function () {
        const text = document.getElementById("qr-text").value;
        const container = document.getElementById("qrcode");

        container.innerHTML = "";
        if (!text.trim()) return alert("Please enter text or URL");

        new QRCode(container, {
            text,
            width: 200,
            height: 200,
            colorDark: "#000",
            colorLight: "#fff"
        });
    };


    /* =====================================================
       WIFI QR CODE
    ===================================================== */
    window.generateWifiQRCode = function () {
        const ssid = document.getElementById("wifi-ssid").value;
        const password = document.getElementById("wifi-password").value;
        const security = document.getElementById("wifi-security").value;
        const container = document.getElementById("wifi-qrcode");

        container.innerHTML = "";
        if (!ssid.trim()) return alert("Please enter SSID");

        const wifiString = `WIFI:T:${security};S:${ssid};P:${password};;`;

        new QRCode(container, {
            text: wifiString,
            width: 200,
            height: 200,
            colorDark: "#000",
            colorLight: "#fff"
        });
    };


    /* =====================================================
       HASH TEXT TOOL (READY)
    ===================================================== */
    const hashButton = document.getElementById("hash-generate");
    const hashInput = document.getElementById("hash-input");
    const hashOutput = document.getElementById("hash-output");

    const hashAlgorithms = ["SHA-1", "SHA-224", "SHA-256", "SHA-384", "SHA-512"];

    const toHex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
    const toBase64 = buf => btoa(String.fromCharCode(...new Uint8Array(buf)));
    const toBase64Url = buf => toBase64(buf).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    const toBinary = buf => [...new Uint8Array(buf)].map(b => b.toString(2).padStart(8, "0")).join(" ");

    hashButton?.addEventListener("click", async () => {
        hashOutput.innerHTML = "";
        if (!hashInput.value) return;

        const data = new TextEncoder().encode(hashInput.value);

        for (const algo of hashAlgorithms) {
            const hash = await crypto.subtle.digest(algo, data);
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${algo}</td>
                <td>${toHex(hash)}</td>
                <td>${toBase64(hash)}</td>
                <td>${toBase64Url(hash)}</td>
                <td>${toBinary(hash)}</td>
            `;
            hashOutput.appendChild(row);
        }
    });

});


const hashAlgorithms = [
    "SHA-1",
    "SHA-224",
    "SHA-256",
    "SHA-384",
    "SHA-512"
];

// ---------- Helpers ----------
function bufferToHex(buffer) {
    return [...new Uint8Array(buffer)]
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

function bufferToBase64(buffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function bufferToBase64Url(buffer) {
    return bufferToBase64(buffer)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

function bufferToBinary(buffer) {
    return [...new Uint8Array(buffer)]
        .map(b => b.toString(2).padStart(8, "0"))
        .join(" ");
}

// ---------- Main ----------
document.getElementById("hash-generate").addEventListener("click", async () => {
    const input = document.getElementById("hash-input").value;
    const output = document.getElementById("hash-output");

    output.innerHTML = "";

    if (!input) return;

    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    for (const algo of hashAlgorithms) {
        try {
            const hashBuffer = await crypto.subtle.digest(algo, data);

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${algo}</td>
                <td>${bufferToHex(hashBuffer)}</td>
                <td>${bufferToBase64(hashBuffer)}</td>
                <td>${bufferToBase64Url(hashBuffer)}</td>
                <td>${bufferToBinary(hashBuffer)}</td>
            `;
            output.appendChild(row);
        } catch (e) {
            console.warn(`Algorithm not supported: ${algo}`);
        }
    }
});

})(jQuery);