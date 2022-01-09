var custom = new function() {
  var s = this;
  s.request = null,
  s.confirm = function(e, t, a, n, o) {
      t = custom.render("modal/confirm.html")($.extend({}, !0, {
          confirm_button: "OK",
          cancel_button: "Cancel",
          width: "600px"
      }, a, {
          title: e,
          confirm_message: t
      }));
      return $(window.document.body).append(t),
      $("#confirmModal").modal({}),
      $("#confirmModal").on("hidden.bs.modal", function(e) {
          if ($("#confirmModal").remove(),
          "function" == typeof o)
              return o.call()
      }),
      $("#confirm_yes").on("click", function(e) {
          return $("#confirm_yes").unbind("click"),
          $("#confirmModal").modal("hide"),
          n.call()
      })
  }
  ,
  s.ajax = function(e) {
      var t = $.extend({}, !0, e);
      "object" == typeof e && (e.beforeSend = function() {
          "function" == typeof t.beforeSend && t.beforeSend()
      }
      ,
      e.success = function(e) {
          "function" == typeof t.success && t.success(e)
      }
      ,
      null != s.request && s.request.abort(),
      s.request = $.ajax(e))
  }
  ,
  s.notify = function(e) {
      var t, a;
      if ($("body").addClass("bottom-right"),
      "object" != typeof e)
          return !1;
      for (t in e)
          void 0 !== (a = $.extend({}, !0, {
              type: "success",
              delay: 8e3,
              text: ""
          }, e[t])).text && null != a.text && $.notify({
              message: a.text.toString()
          }, {
              type: a.type,
              placement: {
                  from: "bottom",
                  align: "right"
              },
              z_index: 2e3,
              delay: a.delay,
              animate: {
                  enter: "animated fadeInDown",
                  exit: "animated fadeOutUp"
              }
          })
  }
  ,
  s.sendBtn = function(t, a) {
      var e;
      "object" != typeof a && (a = {}),
      t.hasClass("active") || (t.addClass("has-spinner"),
      (e = $.extend({}, !0, a)).url = t.attr("href"),
      $(".spinner", t).remove(),
      t.prepend('<span class="spinner"><i class="fa fa-spinner fa-spin"></i></span>'),
      e.beforeSend = function() {
          t.addClass("active")
      }
      ,
      e.success = function(e) {
          t.removeClass("active"),
          $(".spinner", t).remove(),
          "success" == e.status ? "function" == typeof a.callback && a.callback(e) : "error" == e.status && s.notify({
              0: {
                  type: "danger",
                  text: e.message
              }
          })
      }
      ,
      s.ajax(e))
  }
  ,
  s.sendFrom = function(t, a, n) {
      var e, o;
      "object" != typeof n && (n = {}),
      t.hasClass("active") || (t.addClass("has-spinner"),
      e = $.extend({}, !0, n),
      o = $(".error-summary", a),
      e.url = a.attr("action"),
      e.type = "POST",
      $(".spinner", t).remove(),
      t.prepend('<span class="spinner"><i class="fa fa-spinner fa-spin"></i></span>'),
      e.beforeSend = function() {
          t.addClass("active"),
          o.length && (o.addClass("hidden"),
          o.html(""))
      }
      ,
      e.success = function(e) {
          t.removeClass("active"),
          $(".spinner", t).remove(),
          "success" == e.status ? "function" == typeof n.callback && n.callback(e) : "error" == e.status && (e.message && (o.length ? (o.html(e.message),
          o.removeClass("hidden")) : s.notify({
              0: {
                  type: "danger",
                  text: e.message
              }
          })),
          e.errors && $.each(e.errors, function(e, t) {
              alert(t),
              a.yiiActiveForm("updateAttribute", e, t)
          }),
          "function" == typeof n.errorCallback && n.errorCallback(e))
      }
      ,
      s.ajax(e))
  }
  ,
  s.generateUrlFromString = function(e) {
      e = e.trim().replace(/^-+|-+$/gim, "").replace(/[^a-z0-9_\-\s]/gim, "").replace(/[_\s]+/g, "-").replace(/-+/g, "-").toLowerCase();
      return e = "-" === e || "_" === e ? "" : e
  }
  ,
  s.generateUniqueUrl = function(e, t) {
      for (var a, n = e, o = 1; (a = _.find(t, function(e) {
          return e === n
      })) && (n = e + "-" + o,
      o++),
      a; )
          ;
      return n
  }
  ,
  s.render = function(e) {
      return "undefined" == typeof templates || void 0 === templates[e] ? function() {}
      : _.template(templates[e])
  }
  ,
  s.runCopyToClipboard = function() {
      new Clipboard("[data-clipboard=true]").on("success", function(e) {
          e.clearSelection();
          e = e.trigger.dataset.successMessage;
          "string" == typeof e && (e.trim(),
          0 !== e.length && "undefined" != typeof toastr && toastr.success(e))
      })
  }
}
, customModule = {};
window.modules = {},
window.globalOptions = window.globalOptions || {},
window.translates = window.translates || {},
window.translate = function(a, e) {
  return void 0 !== window.translates[a] && (a = window.translates[a],
  e = e || {},
  $.each(e, function(e, t) {
      e = (e = "{{" + e + "}}").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      a = a.replace(new RegExp(e,"g"), t)
  })),
  a
}
,
$(function() {
  "object" == typeof window.modules && $.each(window.modules, function(e, t) {
      void 0 !== customModule[e] && customModule[e].run(t)
  })
}),
templates = Object.create(null),
templates["modal/confirm.html"] = '<div class="modal fade confirm-modal" id="confirmModal" tabindex="-1" data-backdrop="static">\n    <div class="modal-dialog modal-md" role="document">\n        <div class="modal-content">\n            <% if (typeof(confirm_message) !== "undefined" && confirm_message != \'\') { %>\n            <div class="modal-header">\n                <h3 id="conrirm_label"><%= title %></h3>\n                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span aria-hidden="true">&times;</span></button>\n            </div>\n\n            <div class="modal-body">\n                <p><%= confirm_message %></p>\n            </div>\n\n\n            <div class="modal-footer justify-content-start">\n                <button class="btn btn-primary m-btn--air" id="confirm_yes"><%= confirm_button %></button>\n                <button class="btn btn-secondary m-btn--air" data-dismiss="modal" aria-hidden="true"><%= cancel_button %></button>\n            </div>\n            <% } else { %>\n            <div class="modal-body">\n                <div class="text-center">\n                    <h3 id="conrirm_label"><%= title %></h3>\n                </div>\n\n                <div class="text-center">\n                    <button class="btn btn-primary m-btn--air" id="confirm_yes"><%= confirm_button %></button>\n                    <button class="btn btn-secondary m-btn--air" data-dismiss="modal" aria-hidden="true"><%= cancel_button %></button>\n                </div>\n            </div>\n            <% } %>\n        </div>\n    </div>\n</div>',
customModule.analytics = {
  run: function(e) {
      var a = this
        , t = $("body");
      t.on("analytic:info", function(e, t) {
          "undefined" != typeof gtag && null != gtag && a.gaProductInfo(t)
      }),
      t.on("analytic:details", function(e, t) {
          "undefined" != typeof gtag && null != gtag && a.gaProductDetails(t)
      }),
      t.on("analytic:checkout", function(e, t) {
          "undefined" != typeof gtag && null != gtag && a.gaCheckout(t),
          "undefined" != typeof fbq && null != fbq && a.fbCheckout(t)
      }),
      t.on("analytic:success", function(e, t) {
          "undefined" != typeof gtag && null != gtag && a.gaSuccessPayment(t),
          "undefined" != typeof fbq && null != fbq && a.fbSuccessPayment(t)
      })
  },
  gaProductInfo: function(e) {
      e = {
          id: e.package_id,
          name: e.package_name,
          category: e.product_name,
          variant: e.package_name,
          price: e.price_raw,
          quantity: 1
      };
      gtag("event", "view_item", {
          items: [e]
      }),
      gtag("event", "set_checkout_option", {
          checkout_step: 1,
          checkout_option: "Show package info"
      })
  },
  gaProductDetails: function(e) {
      e = {
          id: e.package_id,
          name: e.package_name,
          category: e.product_name,
          variant: e.package_name,
          price: e.price_raw,
          quantity: 1
      };
      gtag("event", "view_item", {
          items: [e]
      }),
      gtag("event", "set_checkout_option", {
          checkout_step: 2,
          checkout_option: "Show package details"
      })
  },
  gaCheckout: function(e) {
      e = {
          id: e.package_id,
          name: e.package_name,
          category: e.product_name,
          variant: e.package_name,
          price: e.price_raw,
          quantity: 1
      };
      gtag("event", "begin_checkout", {
          items: [e]
      }),
      gtag("event", "set_checkout_option", {
          checkout_step: 3,
          checkout_option: "Click checkout button"
      })
  },
  gaSuccessPayment: function(e) {
      var t = {
          id: e.package_id,
          name: e.package_name,
          category: e.product_name,
          variant: e.package_name,
          price: e.price_raw,
          quantity: 1
      };
      gtag("event", "purchase", {
          transaction_id: e.order_id,
          value: e.price_raw,
          tax: e.tax,
          items: [t]
      }),
      gtag("event", "set_checkout_option", {
          checkout_step: 4,
          checkout_option: "Payment success"
      })
  },
  fbCheckout: function(e) {
      fbq("track", "InitiateCheckout", {
          value: e.price_raw,
          currency: e.price_currency
      })
  },
  fbSuccessPayment: function(e) {
      fbq("track", "Purchase", {
          value: e.price_raw,
          currency: e.price_currency,
          contents: [{
              quantity: 1,
              id: e.package_name,
              item_price: e.price_raw
          }],
          content_ids: e.package_id,
          content_type: "product"
      })
  }
},
customModule.paymentsCheckout = {
  fieldsOptions: void 0,
  fieldsContainer: void 0,
  run: function(e) {
      var t = this;
      t.fieldsContainer = $("form"),
      t.fieldOptions = e.fieldOptions,
      t.params = e,
      t.updateFields(),
      void 0 !== e.options && (void 0 !== e.options.stripe && t.initStripe(e.options.stripe),
      void 0 !== e.options.stripeIndia && t.initStripeIndia(e.options.stripeIndia),
      void 0 !== e.options.stripe3ds && t.initStripe3ds(e.options.stripe3ds),
      void 0 !== e.options.razorpay && t.initRazorpay(e.options.razorpay),
      void 0 !== e.options.stripeCheckout && t.initStripeCheckout(e.options.stripeCheckout),
      void 0 !== e.options.checkout_com && t.initCheckoutCom(e.options.checkout_com))
  },
  updateFields: function() {
      console.log("updateFields");
      var a, n, o, s, e = this;
      $("button[type=submit]", e.fieldsContainer).show(),
      $(".fields", e.fieldsContainer).remove(),
      $("input,select", e.fieldsContainer).prop("disabled", !1),
      void 0 !== e.fieldOptions && e.fieldOptions && (a = [],
      n = custom.render("checkout/input.html"),
      o = custom.render("checkout/hidden.html"),
      s = custom.render("checkout/checkbox.html"),
      $.each(e.fieldOptions, function(e, t) {
          void 0 !== t && null != t && t && ("input" == t.type && a.push(n(t)),
          "hidden" == t.type && a.push(o(t)),
          "checkbox" == t.type && a.push(s(t)))
      }),
      ($(".form-group", e.fieldsContainer).length ? $(".form-group", e.fieldsContainer) : $("input", e.fieldsContainer)).last().after(a.join("\r\n")))
  },
  initStripe: function(e) {
      var t = this
        , a = StripeCheckout.configure($.extend({}, !0, e.configure, {
          token: function(e) {
              $("#field-token").val(e.id),
              $("#field-email").val(e.email),
              t.fieldsContainer.submit()
          }
      }));
      a.open(e.open),
      $(window).on("popstate", function() {
          a.close()
      })
  },
  initStripeIndia: function(e) {
      var a = this
        , n = $("#checkout")
        , o = Stripe(e.configure.key)
        , t = o.elements()
        , s = $("#return_url").val()
        , r = $(".error-summary", n)
        , i = t.create("card", {
          style: {
              base: {
                  color: "#32325d",
                  fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                  fontSmoothing: "antialiased",
                  fontSize: "16px",
                  "::placeholder": {
                      color: "#aab7c4"
                  }
              },
              invalid: {
                  color: "#fa755a",
                  iconColor: "#fa755a"
              }
          }
      })
        , e = custom.render("checkout/stripe_card_element.html")({
          label: e.cardLabel,
          btn_label: e.btnLabel
      });
      n.append(e),
      i.mount("#stripe-card-element");
      var d = $("button", a.fieldsContainer);
      d.on("click", function(e) {
          e.preventDefault();
          var t = null;
          if (custom.sendFrom(d, n, {
              url: a.fieldsContainer.attr("action"),
              data: a.fieldsContainer.serialize() + "&save=true",
              async: !1,
              method: "POST",
              callback: function(e) {
                  "success" == e.status && (t = e.data.clientSecret)
              }
          }),
          !t)
              return !0;
          d.data("secret", t),
          o.handleCardPayment(t, i, {
              payment_method_data: {
                  billing_details: {
                      name: $("#field-name").val(),
                      address: {
                          line1: $("#field-line1").val(),
                          city: $("#field-city").val(),
                          state: $("#field-state").val(),
                          postal_code: $("#field-postal_code").val(),
                          country: $("#field-country").val()
                      }
                  }
              }
          }).then(function(e) {
              console.log(JSON.stringify(e)),
              e.error ? r.length && (r.html("Can not create payment"),
              r.removeClass("hidden")) : location.href = s
          })
      })
  },
  initStripe3ds: function(a) {
      var n = this
        , o = Stripe(a.configure.key)
        , s = null
        , e = StripeCheckout.configure($.extend({}, !0, a.configure, {
          token: function(t) {
              o.createSource({
                  type: "card",
                  token: t.id
              }).then(function(e) {
                  !e.error && e.source || window.location.reload(),
                  r(e.source, t)
              })
          }
      }))
        , r = function(e, t) {
          "not_supported" !== e.card.three_d_secure ? o.createSource({
              type: "three_d_secure",
              amount: s,
              currency: a.open.currency,
              three_d_secure: {
                  card: e.id
              },
              redirect: {
                  return_url: a.auth_3ds_request.returnUrl + "&amount=" + s + "&method=" + a.type + "&token=" + t.id + "&payment_id=" + a.payment_id
              }
          }).then(function(e) {
              e.error ? window.location.reload() : i(e.source, t)
          }) : d(t.id, e.id)
      }
        , i = function(e, t) {
          window.location.replace(e.redirect.url)
      }
        , d = function(e, t) {
          $("#field-token").val(e),
          $("#field-source").val(t),
          n.fieldsContainer.submit()
      };
      if (/stripe3ds_auth_callback/.test(window.location.href)) {
          var t = new URLSearchParams(window.location.search)
            , l = t.get("method")
            , c = t.get("token")
            , m = t.get("source")
            , p = t.get("amount")
            , t = t.get("client_secret");
          return l && c && m && p && t ? ($("#amount").val(p / 100),
          void d(c, m)) : void 0
      }
      s = 100 * $("#amount").val(),
      m = $.extend({}, !0, a.open);
      m.amount = s,
      e.open(m),
      $(window).on("popstate", function() {
          e.close()
      })
  },
  initStripeCheckout: function(e) {
      var t = $("#return_url").val();
      void 0 !== e.error && (console.log(e.error),
      window.location = t),
      void 0 !== e.configure && void 0 !== e.configure.public_key && void 0 !== e.configure.session_id || (window.location = t),
      Stripe(e.configure.public_key).redirectToCheckout({
          sessionId: e.configure.session_id
      }).then(function(e) {
          console.log("Something is wrong...", e)
      })
  },
  initRazorpay: function(t) {
      var a = this
        , n = t.options
        , e = $("#return_url").val();
      void 0 !== t.error && (console.log(t.error),
      window.location = e),
      n.handler = function(e) {
          document.getElementById("field-razorpay_payment_id").value = e.razorpay_payment_id,
          document.getElementById("field-razorpay_signature").value = e.razorpay_signature,
          document.getElementById("field-razorpay_order_id").value = n.order_id,
          document.getElementById("field-transaction_id").value = t.transactionId,
          a.fieldsContainer.submit()
      }
      ,
      n.theme.image_padding = !1,
      n.modal = {
          ondismiss: function() {
              window.location = e
          },
          escape: !0,
          backdropclose: !1
      },
      new Razorpay(n).open()
  },
  initCheckoutCom: function(t) {
      var e = $.extend({}, t.init_options, {
          value: 100 * $("#amount").val(),
          customerName: $("#field-billing_name").val(),
          billingDetails: {
              addressLine1: $("#field-billing_line_1").val(),
              addressLine2: $("#field-billing_line_2").val(),
              postcode: $("#field-billing_postal_code").val(),
              country: $("#field-billing_country_code").val(),
              city: $("#field-billing_city").val(),
              phone: {
                  number: $("#field-billing_phone").val()
              }
          },
          cardTokenised: function(e) {
              $("#field-user_email").val(t.init_options.customerEmail),
              $("#field-billing_name").val(t.init_options.customerName),
              $("#field-billing_line_1").val(t.init_options.billingDetails.addressLine1),
              $("#field-billing_postal_code").val(t.init_options.billingDetails.postcode),
              $("#field-billing_country_code").val(t.init_options.billingDetails.country),
              $("#field-billing_city").val(t.init_options.billingDetails.city),
              $("#field-billing_phone").val(t.init_options.billingDetails.phone.number),
              $("#field-card-token").val(e.data.cardToken),
              $("#checkout").submit()
          },
          lightboxDeactivated: function(e) {
              $("#field-card-token").val() || window.location.replace(t.init_options.return_url)
          }
      });
      try {
          Checkout.configure(e),
          Checkout.open()
      } catch (e) {
          window.location.replace(t.init_options.return_url)
      }
  }
},
customModule.contactsForm = {
  run: function(t) {
      var e, a = this, n = $(".block-contactus__form");
      n.length && (1 === window.globalOptions.captcha_type ? e = "https://www.google.com/recaptcha/api.js" : (e = "https://hcaptcha.com/1/api.js",
      $(".g-recaptcha").toggleClass("g-recaptcha").addClass("h-captcha")),
      $.getScript({
          url: e,
          cache: !0
      }, function() {
          n.each(function() {
              var e = $(this);
              a.initForm(e, t)
          })
      }))
  },
  initForm: function(a, e) {
      var n = $("form", a)
        , o = $(".error-summary", a)
        , s = $(".block-contactus__form-button", a)
        , r = $('meta[name="csrf-param"]').attr("content")
        , i = $('meta[name="csrf-token"]').attr("content")
        , d = window.globalOptions.endpoints.contact_action_url;
      window.globalOptions.captcha_show ? (1 === window.globalOptions.captcha_type && $(".g-recaptcha").show(),
      1 !== window.globalOptions.captcha_type && $(".h-captcha").show()) : (1 === window.globalOptions.captcha_type && $(".g-recaptcha").hide(),
      1 !== window.globalOptions.captcha_type && $(".h-captcha").hide()),
      n.on("submit", function(e) {
          if (e.preventDefault(),
          s.addClass("has-spinner"),
          $(".spinner", s).remove(),
          s.prepend('<span class="spinner"><i class="fa fa-spinner fa-spin"></i></span> '),
          s.hasClass("active"))
              return !1;
          s.addClass("active");
          var t = n.serializeArray()
            , e = (1 === window.globalOptions.captcha_type ? grecaptcha : hcaptcha).getResponse();
          return t.push({
              name: r,
              value: i
          }),
          t.push({
              name: "re_captcha",
              value: e
          }),
          $.ajax({
              url: d,
              type: "POST",
              dataType: "json",
              data: t,
              success: function(e) {
                  o.removeClass("alert-danger"),
                  o.addClass("alert-success"),
                  o.html('<div class="alert alert-success">' + e.data.message + "</div>"),
                  n.trigger("reset"),
                  1 === window.globalOptions.captcha_type && $(".g-recaptcha").hide(),
                  1 !== window.globalOptions.captcha_type && $(".h-captcha").hide(),
                  grecaptcha && grecaptcha.reset(),
                  hcaptcha && hcaptcha.reset()
              },
              error: function(e) {
                  o.removeClass("alert-success"),
                  o.addClass("alert-danger"),
                  o.html('<div class="alert alert-danger">' + e.responseJSON.error_message + "</div>"),
                  grecaptcha && grecaptcha.reset(),
                  hcaptcha && hcaptcha.reset(),
                  $(".g-recaptcha").show()
              },
              complete: function(e, t) {
                  $(".spinner", a).remove(),
                  s.removeClass("active")
              }
          }),
          !1
      })
  }
},
customModule.newsletterForm = {
  run: function(t) {
      var e, a = this, n = $(".newsletter-form");
      n.length && (1 === window.globalOptions.captcha_type ? e = "https://www.google.com/recaptcha/api.js" : (e = "https://hcaptcha.com/1/api.js",
      $(".g-recaptcha").toggleClass("g-recaptcha").addClass("h-captcha")),
      $.getScript({
          url: e,
          cache: !0
      }, function() {
          n.each(function() {
              var e = $(this);
              a.initForm(e, t)
          })
      }))
  },
  initForm: function(a, e) {
      var n = $(".error-summary", a)
        , o = $('button[type="submit"]', a)
        , s = $('meta[name="csrf-param"]').attr("content")
        , r = $('meta[name="csrf-token"]').attr("content")
        , i = window.globalOptions.endpoints.newsletter_action_url
        , d = a.data("code");
      window.globalOptions.captcha_show ? (1 === window.globalOptions.captcha_type && $(".g-recaptcha").show(),
      1 !== window.globalOptions.captcha_type && $(".h-captcha").show()) : (1 === window.globalOptions.captcha_type && $(".g-recaptcha").hide(),
      1 !== window.globalOptions.captcha_type && $(".h-captcha").hide()),
      a.on("submit", function(e) {
          if (e.preventDefault(),
          o.addClass("has-spinner"),
          $(".spinner", o).remove(),
          o.prepend('<span class="spinner"><i class="fa fa-spinner fa-spin"></i></span> '),
          o.hasClass("active"))
              return !1;
          o.addClass("active");
          var t = a.serializeArray()
            , e = (1 === window.globalOptions.captcha_type ? grecaptcha : hcaptcha).getResponse();
          return t.push({
              name: s,
              value: r
          }),
          t.push({
              name: "integration_code",
              value: d
          }),
          t.push({
              name: "re_captcha",
              value: e
          }),
          $.ajax({
              url: i,
              type: "POST",
              dataType: "json",
              data: t,
              success: function(e) {
                  n.removeClass("alert-danger"),
                  n.addClass("alert-success"),
                  n.html('<div class="alert alert-success">' + e.data.message + "</div>"),
                  a.trigger("reset"),
                  1 === window.globalOptions.captcha_type && $(".g-recaptcha").hide(),
                  1 !== window.globalOptions.captcha_type && $(".h-captcha").hide(),
                  grecaptcha && grecaptcha.reset(),
                  hcaptcha && hcaptcha.reset()
              },
              error: function(e) {
                  n.removeClass("alert-success"),
                  n.addClass("alert-danger"),
                  n.html('<div class="alert alert-danger">' + e.responseJSON.error_message + "</div>"),
                  grecaptcha && grecaptcha.reset(),
                  hcaptcha && hcaptcha.reset(),
                  $(".g-recaptcha").show()
              },
              complete: function(e, t) {
                  $(".spinner", o).remove(),
                  o.removeClass("active")
              }
          }),
          !1
      })
  }
},
customModule.orderFormFrontend = {
  run: function(e) {
      var t = this;
      t.params = e,
      t.loadedScripts = [],
      t.fieldsContainer = null,
      t.modal = null,
      t.fieldOptions = e.fieldOptions,
      t.cartTotal = {},
      t.paymentMethods = [],
      t.orderDataUrl = window.globalOptions.endpoints.order_data_url,
      t.formActionUrl = window.globalOptions.endpoints.form_action_url,
      t.formValidateUrl = window.globalOptions.endpoints.form_validate_url,
      t.packageId = null,
      t.parentId = null,
      t.paymentsNeedLoad = 1,
      t.formValidateUrlStep1 = window.globalOptions.endpoints.form_validate_first_url,
      t.formValidateUrlStep2 = window.globalOptions.endpoints.form_validate_second_url,
      t.formMoreUrlStep2 = window.globalOptions.endpoints.load_more_for_second_step_url,
      t.formLogMoreUrlStep2 = window.globalOptions.endpoints.load_more_log_url,
      t.orderDataUrl && t.formActionUrl && t.formValidateUrl ? (t.currentMethod = null,
      $(".buy-package").on("click", function(e) {
          e.preventDefault(),
          e.stopPropagation(),
          t.modalEvent({
              id: $(this).data("id")
          })
      }),
      $("body").trigger("order:init")) : console.log("Bad config!")
  },
  modalEvent: function(e) {
      var o = this;
      if (e && e.id && (o.packageId = e.id),
      !o.packageId)
          throw "PackageId is undefined!";
      $(o.modal).length && o.modal.remove(),
      e = o.orderDataUrl.replace("_id_", o.packageId).replace("_with_payments_", o.paymentsNeedLoad),
      custom.ajax({
          url: e,
          type: "GET",
          success: function(e, t, a) {
              if (e.success && e.data) {
                  if (1 == o.paymentsNeedLoad) {
                      var n = e.data.payments_data;
                      if (!n || !n.payment_methods || !n.payment_methods.length)
                          return void console.log("Bad response payments data!", e, t, a);
                      o.paymentsNeedLoad = 0,
                      o.paymentMethods = n.payment_methods,
                      o.currentMethod = o.paymentMethods[0].name,
                      o.params.options = n.options,
                      delete e.data.payments_data
                  } else
                      o.currentMethod = o.paymentMethods[0].name;
                  o.initModal(e.data)
              } else
                  console.log("Bad response data!", e, t, a)
          },
          error: function(e, t, a) {
              "abort" !== t && console.log("Error! Bad response data!", e, t, a)
          }
      })
  },
  enableBtn: function(e) {
      return e = e || $("#continue"),
      $(".spinner", e).remove(),
      e.removeClass("active").removeClass("has-spinner"),
      e.prop("disabled", !1),
      e.css("pointer-events", ""),
      !0
  },
  disableBtn: function(e) {
      return !(e = e || $("#continue")).hasClass("active") && (e.addClass("active"),
      e.prop("disabled", !0),
      e.hasClass("has-spinner") || (e.addClass("has-spinner"),
      e.prepend('<span class="spinner"><i class="fa fa-spinner fa-spin"></i>&nbsp;&nbsp;&nbsp;</span>')),
      !0)
  },
  initModal: function(e) {
      var i = this;
      i.a_event_enable = e.a_event_enable,
      i.a_event_item = {
          package_id: e.id,
          parent_id: e.parent_id,
          package_name: e.name,
          product_id: e.product_id,
          product_name: e.product_name,
          price_raw: e.price_raw,
          price_currency: e.price_currency
      },
      i.templateWrapper = "order/order_modal_wrapper.html",
      i.templateStep1 = "order/order_modal_step1.html",
      $("body").append(custom.render(i.templateWrapper)({
          form_action_url: i.formActionUrl
      })),
      i.modal = $("#order-package-modal"),
      i.fieldsContainer = $("form", i.modal),
      i.orderForm = $("#order-form"),
      i.orderType = e.order_type,
      i.isStandardOrderType = "standard" === e.order_type,
      i.packageType = e.type,
      i.packageQuantity = e.package.quantity || 1,
      i.packageMinQuantity = e.package.min_quantity || 1,
      i.packageTypeSuffix = e.package.type_suffix ? e.package.type_suffix.toLowerCase() : "",
      i.quantityByPost = i.packageQuantity,
      i.isUsername = !i.isStandardOrderType,
      i.linkPlaceholder = "",
      i.isUsername && (i.linkPlaceholder = "johndoe"),
      i.cartTotal.amount = e.price_raw,
      i.cartTotal.currency = e.currency,
      i.tax = e.tax,
      i.packagePrice = e.price,
      i.packageId = e.id,
      i.packageName = e.name,
      i.userEmail = "",
      i.renderStep1(),
      _.defer(function() {
          i.hideValidationError(),
          i.modal.modal("show")
      }),
      $("body").trigger("order_modal:shown"),
      void 0 !== i.params.options && (void 0 !== i.params.options.stripe && i.initStripe(i.params.options.stripe),
      void 0 !== i.params.options.stripe_3d_secure && i.initStripe3dSecure(i.params.options.stripe_3d_secure)),
      $(document).off().on("click", ".sommerce-modals__order-posts__list-item:not(.disabled)", function(e) {
          e.preventDefault();
          var t = $(this)
            , a = t.find("input.sommerce-modals__order-posts__list-item__checkbox-links")
            , n = $(".sommerce-modals__order-posts__list-item__checkbox-links")
            , o = t.find("input.sommerce-modals__order-posts__list-item__checkbox-quantity")
            , s = $(".sommerce-modals__order-posts__list-item__checkbox-quantity")
            , r = $(".sommerce-modals__order-posts__list-item.active").length
            , e = r + 1 <= i.packageQuantity / i.packageMinQuantity || i.packageMinQuantity < i.packageQuantity && !r;
          if (!t.hasClass("active") && !e) {
              r = translate("order.posts.minimum_quantity_exceed", {
                  "package.quantity": i.packageMinQuantity
              });
              return alert(r),
              !1
          }
          "custom_comments" === i.packageTypeSuffix || "mentions_custom_list" === i.packageTypeSuffix || "mentions_user_followers" === i.packageTypeSuffix ? ($(this).find("span").text(i.packageQuantity),
          $("input.sommerce-modals__order-posts__list-item__checkbox-quantity:checked").val(i.packageQuantity),
          $(".sommerce-modals__order-posts__list-item").removeClass("active"),
          t.toggleClass("active", !t.hasClass("active") && e),
          t.hasClass("active") ? ($(".sommerce-modals_comments").removeAttr("hidden"),
          n.removeAttr("checked"),
          s.removeAttr("checked"),
          s.val(""),
          a.attr("checked", "checked"),
          o.attr("checked", "checked"),
          o.val(i.packageQuantity)) : $(".sommerce-modals_comments").attr("hidden")) : (t.toggleClass("active", !t.hasClass("active") && e),
          t.hasClass("active") ? (a.attr("checked", "checked"),
          o.attr("checked", "checked")) : (a.removeAttr("checked"),
          o.removeAttr("checked")),
          i.getItemsByElements())
      }),
      $(".dropdown-toggle").dropdown(),
      $(document).on("click", "#continue", function(e) {
          return !!i.disableBtn() && void i.submitStep1()
      }),
      $(document).on("click", ".sommerce-modals__order-details__user-change", function(e) {
          e.preventDefault(),
          i.renderStep1()
      }),
      $(document).on("change keyup keydown", ".sommerce-modals_comments-textArea", function(a) {
          13 === a.keyCode && a.stopPropagation();
          var e = $(".sommerce-modals_comments-left")
            , t = $(".sommerce-modals__order-posts__list-item :checkbox:checked");
          e.text(function() {
              for (var e = $(".sommerce-modals_comments-textArea").val().split(/\r|\r\n|\n/), t = 0; t < e.length; t++)
                  if ("" === $.trim(e[t]))
                      return 13 === a.keyCode && a.preventDefault(),
                      e.length - 1;
              return e.length
          }),
          e.text() >= i.packageQuantity && 13 === a.keyCode && a.preventDefault(),
          0 < t.length && e.text() == i.packageQuantity ? i.enableBtn() : ($("#proceed_checkout").prop("disabled", !0),
          $("#proceed_checkout").css("pointer-events", "none"))
      }),
      $(document).on("click", ".sommerce-modals__order-posts__list-button", function(e) {
          e.preventDefault();
          var t = $(this);
          if (!t.data("loaded"))
              return t.data("clicked", !0),
              i.disableBtn(t),
              t.data("logged1") || (t.data("logged1", !0),
              i.logShowMore(1)),
              !1;
          if (t.hasClass("active"))
              return !1;
          e = t.data("loads") || 1;
          5 <= e ? (alert(translate("order.profile.unable_to_load_more_posts")),
          t.hide()) : $(".sommerce-modals__order-posts__list-item[data-step=" + e + "]", i.orderForm).show(),
          t.data("clicked") ? t.data("clicked", null) : i.logShowMore(e),
          t.data("loads", ++e),
          10 * e >= i.postsTotal && t.hide()
      }),
      $(document).on("keydown", function(e) {
          13 === e.keyCode && $(".sommerce-modals__order-package-modal__step1").length && i.submitStep1()
      }),
      $(document).on("click", "input.sommerce-modals__order-posts__list-item", function(e) {
          var t = $(this)
            , a = t.find("input.sommerce-modals__order-posts__list-item__checkbox-links")
            , t = t.find("input.sommerce-modals__order-posts__list-item__checkbox-quantity");
          a.attr("checked", !1),
          t.attr("checked", !1)
      }),
      $(document).on("change", 'input[name="OrderForm[method]"]', function() {
          var e = $(this).val();
          i.currentMethod = $(this).data("name"),
          i.updateFields(e)
      }),
      (1 < i.paymentMethods.length ? $('input[name="OrderForm[method]"]:checked') : $('input:hidden[name="OrderForm[method]"]')).trigger("change")
  },
  renderStep1: function() {
      var e = this;
      e.quantityByPost = e.packageQuantity,
      $(e.orderForm).html(custom.render(e.templateStep1)({
          package_id: e.packageId,
          parent_id: e.parentId,
          package_name: e.packageName,
          package_price: e.packagePrice,
          payment_methods: e.paymentMethods,
          form_action_url: e.formActionUrl,
          tax: e.tax,
          order_type: e.orderType,
          is_standard: e.isStandardOrderType,
          is_steps: e.isStepsOrderType,
          link_placeholder: e.linkPlaceholder,
          user_email: e.userEmail,
          link_label: e.isUsername ? translate("order.username") : translate("order.link")
      })),
      e.a_event_enable && $("body").trigger("analytic:info", [e.a_event_item]),
      e.hideValidationError()
  },
  logShowMore: function(e) {
      var n = this
        , e = n.formLogMoreUrlStep2.replace("_step_", e = e || 0);
      $.ajax({
          url: e,
          type: "POST",
          data: n.fieldsContainer.serialize(),
          error: function(e, t, a) {
              _.has(e, "responseJSON") && _.has(e.responseJSON, "error_message") ? n.showValidationError(e.responseJSON.error_message) : console.log("Bad error data!", t, e)
          }
      })
  },
  hideValidationError: function() {
      this.modal.find(".sommerce-modals__alert").html("").css("display", "none")
  },
  showValidationError: function(e) {
      this.modal.find(".sommerce-modals__alert").html(e).css("display", "block")
  },
  formatNumber: function(e) {
      return e ? e.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ") : 0
  },
  getItemsByElements: function() {
      var t = this
        , e = $(".sommerce-modals__order-posts__list-item.active")
        , a = $("input.sommerce-modals__order-posts__list-item__checkbox-quantity:checked")
        , n = e.length
        , o = n ? t.packageQuantity % n : 0;
      if (t.quantityByPost = n ? Math.floor(t.packageQuantity / n) : t.packageQuantity,
      a.val(t.quantityByPost),
      e.each(function(e) {
          $(this).find("span").text(t.quantityByPost)
      }),
      0 < o)
          for (var s = 0; s < o; s++)
              a.eq(s).val(t.quantityByPost + 1),
              e.eq(s).find("span").text(t.quantityByPost + 1)
  },
  submitStep1: function() {
      var n = this;
      n.hideValidationError(),
      console.log(n.formValidateUrl),
      custom.ajax({
          url: n.formValidateUrl,
          type: "POST",
          data: n.fieldsContainer.serialize(),
          beforeSend: function() {
              n.disableBtn()
          },
          success: function(e, t, a) {
              if (!e.success || !e.data)
                  return console.log("Bad response data!", e, t, a),
                  void n.enableBtn();
              n.submitDefault(e.data.url)
          },
          error: function(e, t, a) {
              if (_.has(e, "responseJSON") && _.has(e.responseJSON, "error_message"))
                  return n.showValidationError(e.responseJSON.error_message),
                  void n.enableBtn();
              console.log("Bad error data!", t, e)
          }
      })
  },
  submitDefault: function(e) {
      var n = this;
      n.a_event_enable && $("body").trigger("analytic:checkout", [n.a_event_item]),
      custom.ajax({
          url: e,
          type: "POST",
          data: n.fieldsContainer.serialize(),
          beforeSend: function() {
              n.disableBtn()
          },
          success: function(e, t, a) {
              if (!e.success || !e.data)
                  return console.log("Bad response data!", e, t, a),
                  void n.enableBtn();
              $("#order-form").attr("action", e.data.action),
              n.fieldsContainer.submit()
          },
          error: function(e, t, a) {
              if (_.has(e, "responseJSON") && _.has(e.responseJSON, "error_message"))
                  return n.showValidationError(e.responseJSON.error_message),
                  void n.enableBtn();
              console.log("Bad error data!", t, e)
          }
      })
  },
  updateFields: function(e) {
      var a, n, o, s, t = this;
      $("button[type=submit]", t.fieldsContainer).show(),
      $(".fields", t.fieldsContainer).remove(),
      $("input,select", t.fieldsContainer).prop("disabled", !1),
      void 0 !== t.fieldOptions && void 0 !== t.fieldOptions[e] && t.fieldOptions[e] && (a = [],
      n = custom.render("order/input.html"),
      o = custom.render("order/hidden.html"),
      s = custom.render("order/description.html"),
      Object.keys(t.fieldOptions[e]).length ? ($(".default-fields", t.fieldsContainer).hide(),
      $.each(t.fieldOptions[e], function(e, t) {
          void 0 !== t && null != t && t && ("input" == t.type && a.push(n(t)),
          "hidden" == t.type && a.push(o(t)),
          "description" == t.type && (console.log(t),
          a.push(s(t))))
      }),
      $(".sommerce-modals__forms").prepend(a.join("\r\n")),
      $.each(t.fieldOptions[e], function(e, t) {
          void 0 !== t.rules && $.each(t.rules, function(e, t) {
              "required" == t[1] && $('[name="OrderForm[fields][' + t[0] + ']"]').attr("required", !0)
          })
      })) : $(".default-fields", t.fieldsContainer).show())
  },
  initStripe: function(n) {
      var o, s = this, r = !1;
      $("body").on("validated", s.fieldsContainer, function(e) {
          if (n.type != s.currentMethod)
              return !0;
          var t = $.extend({}, !0, n.open);
          if (t.amount = 100 * $("#amount").val(),
          r)
              "object" == typeof o && o.open(t);
          else {
              if (!n.script)
                  return !1;
              r = !0;
              function a() {
                  o = StripeCheckout.configure($.extend({}, !0, n.configure, {
                      token: function(e) {
                          $("#field-token").val(e.id),
                          $("#field-email").val(e.email),
                          s.fieldsContainer.submit()
                      },
                      closed: function() {
                          s.enableBtn()
                      }
                  })),
                  $(window).on("popstate", function() {
                      o.close()
                  }),
                  o.open(t)
              }
              -1 != s.loadedScripts.indexOf(n.script) ? a() : (s.loadedScripts.push(n.script),
              $.getScript({
                  url: n.script,
                  cache: !0
              }, function() {
                  a()
              }))
          }
          return e.preventDefault(),
          !1
      })
  },
  initStripe3dSecure: function(n) {
      var o, s, r = this, i = !1, d = 0;
      $("body").on("validated", r.fieldsContainer, function(e) {
          if (n.type != r.currentMethod)
              return !0;
          var t = $.extend({}, !0, n.open);
          if (t.amount = 100 * r.cartTotal.amount,
          t.currency = r.cartTotal.currency,
          i)
              "object" == typeof o && o.open(t);
          else {
              if (!n.scripts || !n.scripts.length)
                  return !1;
              function a() {
                  d == n.scripts.length && (Boolean(n.configure.key.trim()) ? (s = Stripe(n.configure.key),
                  o = StripeCheckout.configure($.extend({}, !0, n.configure, {
                      token: function(e) {
                          s.createSource({
                              type: "card",
                              token: e.id
                          }).then(function(e) {
                              var t;
                              e.error || !e.source ? (console.log("ERROR!", e.error.message),
                              window.location.replace(n.return_url)) : "not_supported" !== (t = e.source).card.three_d_secure ? (e = n.return_url + "?" + r.fieldsContainer.serialize(),
                              s.createSource({
                                  type: "three_d_secure",
                                  amount: 100 * r.cartTotal.amount,
                                  currency: r.cartTotal.currency,
                                  three_d_secure: {
                                      card: t.id
                                  },
                                  redirect: {
                                      return_url: e
                                  }
                              }).then(function(e) {
                                  e.error ? (console.log("ERROR!", e.error.message),
                                  window.location.replace(n.return_url)) : function(e) {
                                      e.redirect && e.redirect.failure_reason && (console.log("REDIRECT ERROR!", e.redirect.failure_reason),
                                      window.location.replace(n.return_url));
                                      window.location.replace(e.redirect.url)
                                  }(e.source)
                              })) : (console.log("This card does not support 3D Secure!"),
                              window.location.replace(n.return_url))
                          })
                      },
                      closed: function() {
                          r.enableBtn()
                      }
                  })),
                  $(window).on("popstate", function() {
                      o.close()
                  }),
                  o.open(t)) : console.log("Bad Stripe3dSecure configuration!"))
              }
              $.each(n.scripts, function(e, t) {
                  -1 != r.loadedScripts.indexOf(t) ? (d++,
                  a()) : (r.loadedScripts.push(t),
                  $.getScript({
                      url: t,
                      cache: !0
                  }, function() {
                      d++,
                      a()
                  }))
              }),
              i = !0
          }
          return e.preventDefault(),
          !1
      })
  }
},
customModule.paymentResultModal = {
  run: function(t) {
      var e = null
        , a = null;
      switch (t.type) {
      case "payment_fail":
          a = custom.render("payments_modal/failed.html")(t.data),
          e = "#modal-payment-failed";
          break;
      case "payment_success":
          a = custom.render("payments_modal/success.html")(t.data),
          e = "#modal-payment-success",
          t.a_event_enable && $("body").trigger("analytic:success", [t.data]);
          break;
      case "payment_awaiting":
          a = custom.render("payments_modal/awaiting.html")(t.data),
          e = "#modal-payment-awaiting";
          break;
      case "payment_pending":
          a = custom.render("payments_modal/pending.html")(t.data),
          e = "#modal-payment-pending";
          break;
      case "order_details":
          a = custom.render("payments_modal/order_details.html")(t.data),
          e = "#modal-order-details"
      }
      t.url && history.pushState({}, document.title, t.url),
      $("body").on("order:init", function() {
          t.package_id && (customModule.orderFormFrontend.modalEvent({
              id: t.package_id
          }),
          t.package_id = void 0)
      }),
      $("body").on("order_modal:shown", function(e) {
          t.link && ($("#link").val(t.link),
          t.link = void 0),
          t.email && ($("#email").val(t.email),
          t.email = void 0),
          t.parent_id && ($("#parent_id").val(t.parent_id),
          t.parent_id = void 0)
      }),
      e && ($("body").append(a),
      $(e).modal("show"))
  }
},
templates = Object.create(null),
templates["modal/confirm.html"] = '<div class="modal fade confirm-modal" id="confirmModal" tabindex="-1" data-backdrop="static">\n    <div class="modal-dialog modal-md" role="document">\n        <div class="modal-content">\n            <% if (typeof(confirm_message) !== "undefined" && confirm_message != \'\') { %>\n            <div class="modal-header">\n                <h3 id="conrirm_label"><%= title %></h3>\n                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span aria-hidden="true">&times;</span></button>\n            </div>\n\n            <div class="modal-body">\n                <p><%= confirm_message %></p>\n            </div>\n\n\n            <div class="modal-footer justify-content-start">\n                <button class="btn btn-primary m-btn--air" id="confirm_yes"><%= confirm_button %></button>\n                <button class="btn btn-secondary m-btn--air" data-dismiss="modal" aria-hidden="true"><%= cancel_button %></button>\n            </div>\n            <% } else { %>\n            <div class="modal-body">\n                <div class="text-center">\n                    <h3 id="conrirm_label"><%= title %></h3>\n                </div>\n\n                <div class="text-center">\n                    <button class="btn btn-primary m-btn--air" id="confirm_yes"><%= confirm_button %></button>\n                    <button class="btn btn-secondary m-btn--air" data-dismiss="modal" aria-hidden="true"><%= cancel_button %></button>\n                </div>\n            </div>\n            <% } %>\n        </div>\n    </div>\n</div>',
templates["checkout/checkbox.html"] = '<div class="form-group fields" id="order_<%= name %>">\n    <label class="control-label" for="field-<%= name %>"><%= label %></label><br>\n    <input name="fields[<%= name %>]" value="0" type="hidden"/>\n    <input name="fields[<%= name %>]" value="1" type="checkbox" id="field-<%= name %>"/>\n</div>',
templates["checkout/description.html"] = '<div class="form-group fields" id="order_<%= name %>">\n    <label class="control-label" for="field-<%= name %>"><%= label %></label>\n    <div class="panel-body border-solid border-rounded text-center"><%= value %></div>\n</div>',
templates["checkout/hidden.html"] = '<input class="fields" name="fields[<%= name %>]" value="<%= value %>" type="hidden" id="field-<%= name %>"/>',
templates["checkout/input.html"] = '<div class="form-group fields" id="order_<%= name %>">\n    <label class="control-label" for="field-<%= name %>"><%= label %></label>\n    <input class="form-control" name="fields[<%= name %>]" value="<%= value %>" type="text" id="field-<%= name %>"/>\n</div>',
templates["checkout/stripe_card_element.html"] = '<div class="form-group">\n    <label class="control-label" ><%= label %></label>\n    <div id="stripe-card-element" ></div>\n</div>\n<div class="row">\n    <div class="col-md-12">\n        <button type="submit" class="btn btn-success"><%= btn_label %></button>\n    </div>\n</div>',
templates["checkout/stripe_payment_request_btn.html"] = '<span id="<%= id %>" style="width: 150px; height: 18px; display: inline-block;" class="hidden"></span>',
templates["order/hidden.html"] = '<input class="fields" name="OrderForm[fields][<%= name %>]" value="<%= value %>" type="hidden" id="field-<%= name %>"/>',
templates["order/input.html"] = '<div class="form-group sommerce-modals__form-group fields" id="order_<%= name %>">\n    <label class="control-label" for="orderform-<%= name %>"><%= label %></label>\n    <input class="form-control" name="OrderForm[fields][<%= name %>]" value="<%= value %>" type="text" id="field-<%= name %>">\n</div>\n',
templates["order/order_modal_step1.html"] = '<div class="sommerce-modals__order-package-modal__step1">\n\t<div class="sommerce-modals__header">\n\t\t<div class="sommerce-modals__header-title"><%= translate(\'order.order_details_header\') %></div>\n\t\t<div class="sommerce-modals__header-close" data-dismiss="modal" aria-label="Close">\n\t\t\t<span class="sommerce-modals__order-icons-close"></span>\n\t\t</div>\n\t</div>\n\t<div class="sommerce-modals__alert sommerce-modals__alert-danger">\n\t\t<span><%= translate(\'order.invalid.link\') %></span>\n\t</div>\n\t<div class="sommerce-modals__order-details">\n\t\t<table class="sommerce-modals__order-table">\n\t\t\t<tbody>\n\t\t\t<tr>\n\t\t\t\t<td class="sommerce-modals__order-name"><%= translate(\'order.package\') %>:</td>\n\t\t\t\t<td class="sommerce-modals__order-value"><%= package_name %></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td class="sommerce-modals__order-name"><%= translate(\'order.price\') %>:</td>\n\t\t\t\t<% if (tax) { %>\n\t\t\t\t\t<td class="sommerce-modals__order-value"><%= package_price %>\n\t\t\t\t\t\t<span class="text-muted">(<%= tax %> <%= translate(\'order.tax_included\') %>)</span>\n\t\t\t\t\t</td>\n\t\t\t\t<% } else { %>\n\t\t\t\t\t<td class="sommerce-modals__order-value"><%= package_price %></td>\n\t\t\t\t<% }; %>\n\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\t</div>\n\t<div>\n\t\t<input type="hidden" name="OrderForm[package_id]" value="<%= package_id %>">\n\t\t<input type="hidden" id="parent_id" name="OrderForm[parent_id]" value="<%= parent_id %>">\n\t\t<div class="sommerce-modals__forms">\n\t\t\t<div class="form-group sommerce-modals__form-group default-fields">\n\t\t\t\t<label for="email"><%= translate(\'order.email\') %></label>\n\t\t\t\t<input\n\t\t\t\t\ttype="email"\n\t\t\t\t\tclass="form-control"\n\t\t\t\t\tid="email"\n\t\t\t\t\tname="OrderForm[email]"\n\t\t\t\t\tplaceholder="johndoe@example.com"\n\t\t\t\t\tvalue="<%= user_email %>"\n\t\t\t\t/>\n\t\t\t\t<small class="form-text text-muted"><%= translate(\'order.email.disclaimer\') %></small>\n\t\t\t</div>\n\t\t</div>\n\t\t<% if (payment_methods && is_standard) { %>\n\t\t\t<% if (payment_methods.length > 1) { %>\n\t\t\t\t<div class="sommerce-modals__payments">\n\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t<div class="sommerce-modals__payments-title"><%= translate(\'order.payment.methods\') %></div>\n\t\t\t\t\t\t<% _.each(payment_methods, function(method) { %>\n\t\t\t\t\t\t<div class="form-check form-check-inline">\n\t\t\t\t\t\t\t<input\n\t\t\t\t\t\t\t\tclass="form-check-input"\n\t\t\t\t\t\t\t\ttype="radio"\n\t\t\t\t\t\t\t\tname="OrderForm[method]"\n\t\t\t\t\t\t\t\tid="method-<%= method.id %>"\n\t\t\t\t\t\t\t\t<% if (method.id === payment_methods[0].id) { %> checked <% } %>\n\t\t\t\t\t\t\t\tvalue="<%= method.id %>"\n\t\t\t\t\t\t\t\tdata-name="<%= method.name %>"\n\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t<label class="form-check-label" for="method-<%= method.id %>"><%= method.name %></label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<% }); %>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t<% } else { %>\n\t\t\t\t<input type="hidden" name="OrderForm[method]" value="<%= payment_methods[0].id %>">\n\t\t\t<% }; %>\n\t\t<% }; %>\n\t\t<div class="sommerce-modals__actions">\n\t\t\t<button type="button" class="btn btn-block sommerce-modals__btn-primary" id="continue"><%= translate(\'order.button.proceed_to_step_checkout\') %></button>\n\t\t</div>\n\t</div>\n</div>',
templates["order/order_modal_wrapper.html"] = '<div class="modal fade body" id="order-package-modal" tabindex="-1" role="dialog" data-backdrop="static">\n\t<div class="modal-dialog sommerce-modals__dialog" role="document">\n\t\t<div class="modal-content sommerce-modals__content">\n\t\t\t<div class="modal-body sommerce-modals__body body">\n\t\t\t\t<form action="<%= form_action_url %>" method="post" id="order-form">\n\t\t\t\t\t\n\t\t\t\t</form>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>',
templates["order/trial_order_modal.html"] = '<div class="sommerce-modals__order-package-modal__step1">\n    <div class="sommerce-modals__header">\n        <div class="sommerce-modals__header-title"><%= translate(\'order.title\') %></div>\n        <div class="sommerce-modals__header-close" data-dismiss="modal" aria-label="Close">\n            <span class="sommerce-modals__order-icons-close"></span>\n        </div>\n    </div>\n    <div class="sommerce-modals__alert sommerce-modals__alert-danger">\n        <span><%= translate(\'order.invalid.link\') %></span>\n    </div>\n    <div class="sommerce-modals__order-details">\n        <table class="sommerce-modals__order-table">\n            <tbody>\n            <tr>\n                <td class="sommerce-modals__order-name"><%= translate(\'order.package\') %>:</td>\n                <td class="sommerce-modals__order-value"><%= package_name %></td>\n            </tr>\n            </tbody>\n        </table>\n    </div>\n    <form action="<%= form_action_url %>" method="post">\n        <input type="hidden" name="OrderForm[package_id]" value="<%= package_id %>">\n        <input type="hidden" id="parent_id" name="OrderForm[parent_id]" value="<%= parent_id %>">\n        <div class="sommerce-modals__forms">\n            <div class="form-group sommerce-modals__form-group">\n                <label for="link">\n                    <%= link_label %>\n                </label>\n                <input \n                    type="text" \n                    class="form-control" \n                    id="link" \n                    name="OrderForm[link]" \n                    placeholder="<%= link_placeholder %>"\n                >\n            </div>\n            <div class="form-group sommerce-modals__form-group">\n                <label for="email"><%= translate(\'order.email\') %></label>\n                <input \n                    type="email" \n                    class="form-control" \n                    id="email" \n                    name="OrderForm[email]" \n                    placeholder="johndoe@example.com"\n                    value="<%= user_email %>"\n                >\n                <small class="form-text text-muted">\n                    <%= translate(\'order.email.disclaimer\') %>\n                </small>\n            </div>\n        </div>\n        <div class="sommerce-modals__actions">\n            <% if (is_standard) { %>\n                <button type="button" class="btn btn-block sommerce-modals__btn-primary" id="proceed_checkout">\n                    <%= translate(\'order.button.proceed_to_trial_checkout\') %>\n                </button>\n            <% }; %>\n            <% if (is_steps) { %>\n                <button type="button" class="btn btn-block sommerce-modals__btn-primary" id="continue">\n                    <%= translate(\'order.button.proceed_to_step_checkout\') %>\n                </button>\n            <% }; %>\n        </div>\n    </form>\n</div>\n',
templates["payments_modal/awaiting.html"] = '<div class="modal fade" id="modal-payment-awaiting" tabindex="-1" role="dialog" data-backdrop="static">\n    <div class="modal-dialog sommerce-modals__dialog" role="document">\n        <div class="modal-content sommerce-modals__content">\n            <div class="modal-body sommerce-modals__body body">\n                <div class="sommerce-modals__header">\n                    <div class="sommerce-modals__header-title"></div>\n                    <div class="sommerce-modals__header-close" data-dismiss="modal" aria-label="Close">\n                        <span class="sommerce-modals__order-icons-close"></span>\n                    </div>\n                </div>\n\n                <div class="sommerce-modals__order-header">\n                    <div class="sommerce-modals__order-header-icon">\n                        <div class="sommerce-modals__order-icons-awaiting"></div>\n                    </div>\n                    <div class="sommerce-modals__order-header-title">\n                        <%= translate(\'payment.awaiting.title\') %>\n                    </div>\n                    <div class="sommerce-modals__order-header-description">\n                        <%= translate(\'payment.awaiting.description\') %>\n                    </div>\n                </div>\n                <div class="sommerce-modals__actions text-center">\n                    <button class="btn sommerce-modals__btn-default sommerce-modals__actions-btn-center" data-dismiss="modal"><%= translate(\'payment.awaiting.button\') %></button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n',
templates["payments_modal/failed.html"] = '<div class="modal fade" id="modal-payment-failed" tabindex="-1" role="dialog" data-backdrop="static">\n    <div class="modal-dialog sommerce-modals__dialog" role="document">\n        <div class="modal-content sommerce-modals__content">\n            <div class="modal-body sommerce-modals__body body">\n                <div class="sommerce-modals__header">\n                    <div class="sommerce-modals__header-title"></div>\n                    <div class="sommerce-modals__header-close" data-dismiss="modal" aria-label="Close">\n                        <span class="sommerce-modals__order-icons-close"></span>\n                    </div>\n                </div>\n\n                <div class="sommerce-modals__order-header">\n                    <div class="sommerce-modals__order-header-icon">\n                        <div class="sommerce-modals__order-icons-failed"></div>\n                    </div>\n                    <div class="sommerce-modals__order-header-title">\n                        <%= translate(\'payment.failed.title\') %>\n                    </div>\n                    <div class="sommerce-modals__order-header-description">\n                        <%= translate(\'payment.failed.description\') %>\n                    </div>\n                </div>\n                <div class="sommerce-modals__actions text-center">\n                    <button class="btn sommerce-modals__btn-default sommerce-modals__actions-btn-center" data-dismiss="modal"><%= translate(\'payment.failed.button\') %></button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n',
templates["payments_modal/order_details.html"] = '<div class="modal fade" id="modal-order-details" tabindex="-1" role="dialog" data-backdrop="static">\n    <div class="modal-dialog modal-lg" role="document">\n        <div class="modal-content sommerce-modals__content">\n            <div class="modal-body sommerce-modals__body body">\n                <div class="sommerce-modals__header">\n                    <div class="sommerce-modals__header-title"></div>\n                    <div class="sommerce-modals__header-close" data-dismiss="modal" aria-label="Close">\n                        <span class="sommerce-modals__order-icons-close"></span>\n                    </div>\n                </div>\n\n                <div class="sommerce-modals__order-header">\n                    <div class="sommerce-modals__order-header-icon">\n                        <div class="sommerce-modals__order-icons-details"></div>\n                    </div>\n                    <div class="sommerce-modals__order-header-title">\n                        <%= translate(\'vieworder.title\') %>\n                    </div>\n                    <div class="sommerce-modals__order-header-description">\n                        <%= translate(\'vieworder.description\') %>\n                    </div>\n                    <div class="sommerce-modals__order-cost">\n                        <div class="sommerce-modals__order-cost-package"><%= package_title %></div>\n                        -\n                        <div class="sommerce-modals__order-cost-price"><%= package_price %></div>\n                    </div>\n                </div>\n\n                <div class="sommerce-modals__order-result">\n                    <table class="sommerce-modals__order-result-table">\n                        <thead>\n                        <tr>\n                            <th><%= translate(\'orders.table.id\') %></th>\n                            <th><%= is_auto_order ? translate(\'orders.table.link\') : translate(\'orders.table.details\') %></th>\n                            <th><%= is_auto_order ? \'\' : translate(\'orders.table.quantity\') %></th>\n                            <th><%= translate(\'orders.table.status\') %></th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <% _.each(items, function(item,key,arr) { %>\n                            <tr>\n                                <td data-label="Order ID"><%= item[\'suborder_id\'] %></td>\n                                <td data-label="Details"><%= item[\'details\'] %></td>\n                                <td data-label="Price" nowrap=""><%= is_auto_order ? \'\' : item[\'quantity\'] %></td>\n                                <td data-label="Status">\n                                    <span class="sommerce-status-text"><%= item[\'status\'] %></span>\n                                </td>\n                            </tr>\n                        <% }); %>\n                        </tbody>\n                    </table>\n                </div>\n                <div class="sommerce-modals__actions text-center">\n                    <button class="btn sommerce-modals__btn-default sommerce-modals__actions-btn-center" data-dismiss="modal"><%= translate(\'orders.details.button\') %></button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n',
templates["payments_modal/pending.html"] = '<div class="modal fade" id="modal-payment-pending" tabindex="-1" role="dialog" data-backdrop="static">\n    <div class="modal-dialog sommerce-modals__dialog" role="document">\n        <div class="modal-content sommerce-modals__content">\n            <div class="modal-body sommerce-modals__body body">\n                <div class="sommerce-modals__header">\n                    <div class="sommerce-modals__header-title"></div>\n                    <div class="sommerce-modals__header-close" data-dismiss="modal" aria-label="Close">\n                        <span class="sommerce-modals__order-icons-close"></span>\n                    </div>\n                </div>\n\n                <div class="sommerce-modals__order-header">\n                    <div class="sommerce-modals__order-header-icon">\n                        <div class="sommerce-modals__order-icons-pending"></div>\n                    </div>\n                    <div class="sommerce-modals__order-header-title">\n                        <%= translate(\'payment.pending.title\') %>\n                    </div>\n                    <div class="sommerce-modals__order-header-description">\n                        <%= translate(\'payment.pending.description\') %>\n                    </div>\n                </div>\n                <div class="sommerce-modals__actions text-center">\n                    <button class="btn sommerce-modals__btn-default sommerce-modals__actions-btn-center" data-dismiss="modal"><%= translate(\'payment.pending.button\') %></button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n',
templates["payments_modal/success.html"] = '<div class="modal fade" id="modal-payment-success" tabindex="-1" role="dialog" data-backdrop="static">\n    <div class="modal-dialog modal-lg" role="document">\n        <div class="modal-content sommerce-modals__content">\n            <div class="modal-body sommerce-modals__body body">\n                <div class="sommerce-modals__header">\n                    <div class="sommerce-modals__header-title"></div>\n                    <div class="sommerce-modals__header-close" data-dismiss="modal" aria-label="Close">\n                        <span class="sommerce-modals__order-icons-close"></span>\n                    </div>\n                </div>\n\n                <div class="sommerce-modals__order-header">\n                    <div class="sommerce-modals__order-header-icon">\n                        <div class="sommerce-modals__order-icons-success"></div>\n                    </div>\n                    <div class="sommerce-modals__order-header-title">\n                        <%= is_trial ? translate(\'payment.trial.title\') : translate(\'payment.successful.title\') %>\n                    </div>\n                    <div class="sommerce-modals__order-header-description">\n                        <%= is_trial ? translate(\'payment.trial.description\') : translate(\'payment.successful.description\') %>\n                    </div>\n                    <div class="sommerce-modals__order-cost">\n                        <div class="sommerce-modals__order-cost-package"><%= package_title %></div>\n                        -\n                        <div class="sommerce-modals__order-cost-price"><%= package_price %></div>\n                    </div>\n                </div>\n\n                <div class="sommerce-modals__order-result">\n                    <table class="sommerce-modals__order-result-table">\n                        <thead>\n                        <tr>\n                            <th><%= translate(\'orders.table.id\') %></th>\n                            <th><%= translate(\'orders.table.details\') %></th>\n                            <th><%= is_auto_order ? translate(\'orders.table.period\') : translate(\'orders.table.quantity\') %></th>\n                            <th><%= translate(\'orders.table.status\') %></th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <% _.each(items, function(item,key,arr) { %>\n                            <tr>\n                                <td data-label="Order ID"><%= item[\'suborder_id\'] %></td>\n                                <td data-label="Details"><%= item[\'details\'] %></td>\n                                <td data-label="Price" nowrap=""><%= is_auto_order ? item[\'period\'] : item[\'quantity\'] %></td>\n                                <td data-label="Status">\n                                    <span class="sommerce-status-text"><%= item[\'status\'] %></span>\n                                </td>\n                            </tr>\n                        <% }); %>\n                        </tbody>\n                    </table>\n                </div>\n                <div class="sommerce-modals__actions text-center">\n                    <button class="btn sommerce-modals__btn-default sommerce-modals__actions-btn-center" data-dismiss="modal"><%= is_trial ? translate(\'payment.trial.button\') : translate(\'payment.successful.button\') %></button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>';
