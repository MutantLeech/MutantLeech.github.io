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

	/* =====================================================
	PASSWORD STRENGTH ANALYZER
	===================================================== */


	var $pwInput = $('#pw-input');
	var $pwBar = $('#pw-bar');
	var $pwLabel = $('#pw-label');
	var $pwFeedback = $('#pw-feedback');

	function analyzePassword(pw) {
		let score = 0;
		let feedback = [];
		let charsetSize = 0;

		// Character set calculation
		if (/[a-z]/.test(pw)) charsetSize += 26;
		if (/[A-Z]/.test(pw)) charsetSize += 26;
		if (/\d/.test(pw)) charsetSize += 10;
		if (/[^a-zA-Z0-9]/.test(pw)) charsetSize += 32; // common symbols

		// Password scoring
		if (pw.length >= 8) score += 20;
		if (pw.length >= 12) score += 10;
		if (/[a-z]/.test(pw)) score += 15;
		if (/[A-Z]/.test(pw)) score += 15;
		if (/\d/.test(pw)) score += 15;
		if (/[^a-zA-Z0-9]/.test(pw)) score += 25;

		// Entropy calculation
		let entropy = pw.length * Math.log2(charsetSize || 1);

		// Estimated brute-force time
		const guessesPerSecond = 1e9; // 1 billion guesses/sec
		let timeSeconds = Math.pow(2, entropy) / guessesPerSecond;

		// Convert time to readable format
		function formatTime(seconds) {
			const units = [
				{ label: "years", value: 60*60*24*365 },
				{ label: "days", value: 60*60*24 },
				{ label: "hours", value: 60*60 },
				{ label: "minutes", value: 60 },
				{ label: "seconds", value: 1 }
			];
			for (let unit of units) {
				if (seconds >= unit.value) return Math.round(seconds / unit.value) + " " + unit.label;
			}
			return "< 1 second";
		}

		return {
			score: Math.min(score, 100),
			feedback,
			length: pw.length,
			charsetSize,
			entropy: entropy.toFixed(2),
			crackTime: formatTime(timeSeconds)
		};
	}

	function updatePasswordUI() {
		var pw = $pwInput.val();
		var result = analyzePassword(pw);

		$pwBar.css('width', result.score + '%');

		let label, color;
		if (result.score < 30) {
			label = 'Very Weak';
			color = '#ff4d4d';
		} else if (result.score < 50) {
			label = 'Weak';
			color = '#ff944d';
		} else if (result.score < 70) {
			label = 'Okay';
			color = '#ffd24d';
		} else if (result.score < 90) {
			label = 'Strong';
			color = '#9dff4d';
		} else {
			label = 'Very Strong';
			color = '#4dff88';
		}

		$pwBar.css('background', color);
		$pwLabel.text(label);
		$pwLabel.css('color', color)

		// Feedback
		$pwFeedback.empty();
		result.feedback.forEach(msg => {
			$pwFeedback.append(`<li>${msg}</li>`);
		});

		// Additional info
		if ($('#pw-info').length === 0) {
			$pwFeedback.after(`<ul id="pw-info" class="pw-feedback"></ul>`);
		}
		const $pwInfo = $('#pw-info');
		$pwInfo.html(`
			<li><strong>Password length:</strong> ${result.length}</li>
			<li><strong>Entropy:</strong> ${result.entropy} bits</li>
			<li><strong>Character set size:</strong> ${result.charsetSize}</li>
			<li><strong>Estimated crack time:</strong> ${result.crackTime}</li>
		`);
	}

	$pwInput.on('input', updatePasswordUI);

	document.getElementById('pdf-file').addEventListener('change', async (event) => {
		pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.246/pdf.worker.min.js';
		const file = event.target.files[0];
		const resultDiv = document.getElementById('pdf-sign-result');
		resultDiv.innerHTML = '';

		if (!file) return;

		// Show loading message
		resultDiv.innerHTML = '<p>Checking PDF...</p>';

		try {
			const arrayBuffer = await file.arrayBuffer();
			const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

			let signaturesFound = [];

			for (let i = 1; i <= pdf.numPages; i++) {
				const page = await pdf.getPage(i);
				const annotations = await page.getAnnotations();

				annotations.forEach(annotation => {
					if (annotation.subtype === 'Widget' && annotation.fieldType === 'Sig') {
						signaturesFound.push(i);
					}
				});
			}

			if (signaturesFound.length > 0) {
				resultDiv.innerHTML = `<p style="color:green;">Signature found on page(s): ${signaturesFound.join(', ')}</p>`;
			} else {
				resultDiv.innerHTML = '<p style="color:orange;">No digital signatures found in this PDF.</p>';
			}
		} catch (err) {
			console.error(err);
			resultDiv.innerHTML = `<p style="color:red;">Error reading PDF: ${err.message}</p>`;
		}
	});

	document.addEventListener('DOMContentLoaded', () => {
		const numInput = document.getElementById('num-input');
		const romanOutput = document.getElementById('roman-output');
		const romanInput = document.getElementById('roman-input');
		const numOutput = document.getElementById('num-output');

		const romanMap = [
			{ val: 1000, sym: 'M' },
			{ val: 900, sym: 'CM' },
			{ val: 500, sym: 'D' },
			{ val: 400, sym: 'CD' },
			{ val: 100, sym: 'C' },
			{ val: 90, sym: 'XC' },
			{ val: 50, sym: 'L' },
			{ val: 40, sym: 'XL' },
			{ val: 10, sym: 'X' },
			{ val: 9, sym: 'IX' },
			{ val: 5, sym: 'V' },
			{ val: 4, sym: 'IV' },
			{ val: 1, sym: 'I' },
		];

		function toRoman(num) {
			if (num < 1 || num > 3999) return 'Out of range enter between 1 & 3999';
			let result = '';
			for (let {val, sym} of romanMap) {
				while (num >= val) {
					result += sym;
					num -= val;
				}
			}
			return result;
		}

		function fromRoman(str) {
			str = str.toUpperCase();
			let index = 0;
			let num = 0;
			for (let {val, sym} of romanMap) {
				while (str.slice(index, index + sym.length) === sym) {
					num += val;
					index += sym.length;
				}
			}
			return index === str.length ? num : 'Invalid Roman numeral';
		}

		numInput.addEventListener('input', () => {
			const value = parseInt(numInput.value, 10);
			romanOutput.textContent = isNaN(value) ? '' : toRoman(value);
		});

		romanInput.addEventListener('input', () => {
			const value = romanInput.value.trim();
			numOutput.textContent = value ? fromRoman(value) : '';
		});
	});

	const copyButtons = document.querySelectorAll('.copyBtn');

	copyButtons.forEach(button => {
		button.addEventListener('click', () => {
		// Get the ID of the div to copy from the button's data attribute
		const targetId = button.getAttribute('data-target');
		const textToCopy = document.getElementById(targetId).textContent;

		// Copy to clipboard
		navigator.clipboard.writeText(textToCopy).then(() => {
			alert(`Copied text from ${targetId}!`);
		}).catch(err => {
			console.error('Failed to copy text: ', err);
		});
		});
	});

	lucide.createIcons();

})(jQuery);