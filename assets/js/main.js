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
	HASH TEXT TOOL
	===================================================== */

	var $hashInput = $('#hash-input');
	var $hashEncoding = $('#hash-encoding');
	var $hashRows = $('.hash-row');

	function encodeHash(wordArray, encoding) {
		switch (encoding) {
			case 'hex':
				return wordArray.toString(CryptoJS.enc.Hex);
			case 'base64':
				return CryptoJS.enc.Base64.stringify(wordArray);
			case 'base64url':
				return CryptoJS.enc.Base64.stringify(wordArray)
					.replace(/\+/g, '-')
					.replace(/\//g, '_')
					.replace(/=+$/, '');
			case 'binary':
				return wordArray.toString(CryptoJS.enc.Hex)
					.match(/.{1,2}/g)
					.map(b => parseInt(b, 16).toString(2).padStart(8, '0'))
					.join(' ');
		}
	}

	function updateHashes() {
		var text = $hashInput.val();
		var encoding = $hashEncoding.val();

		$hashRows.each(function () {
			var algo = $(this).data('algo');
			var $output = $(this).find('input');

			if (!text) {
				$output.val('');
				return;
			}

			var hash;
			switch (algo) {
				case 'MD5': hash = CryptoJS.MD5(text); break;
				case 'SHA1': hash = CryptoJS.SHA1(text); break;
				case 'SHA224': hash = CryptoJS.SHA224(text); break;
				case 'SHA256': hash = CryptoJS.SHA256(text); break;
				case 'SHA384': hash = CryptoJS.SHA384(text); break;
				case 'SHA512': hash = CryptoJS.SHA512(text); break;
				case 'SHA3': hash = CryptoJS.SHA3(text); break;
				case 'RIPEMD160': hash = CryptoJS.RIPEMD160(text); break;
			}

			$output.val(encodeHash(hash, encoding));
		});
	}

	$hashInput.on('input', updateHashes);
	$hashEncoding.on('change', updateHashes);

	$('.hash-row .copy').on('click', function () {
		navigator.clipboard.writeText(
			$(this).siblings('input').val()
		);
	});

	lucide.createIcons();

})(jQuery);