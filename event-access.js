(function () {
  const OVERLAY_ID = "eventAccessOverlay";
  let firebaseToolsPromise;

  function getRemoteConfig() {
    const config = window.EVENT_REMOTE_CONFIG || {};

    return {
      eventId: config.eventId || "",
      accessPath: config.accessPath || "",
      firebaseConfig: config.firebaseConfig || null
    };
  }

  function hasRemoteConfig() {
    const config = getRemoteConfig();
    return Boolean(config.eventId && config.accessPath && config.firebaseConfig && config.firebaseConfig.apiKey);
  }

  async function getFirebaseTools() {
    if (!firebaseToolsPromise) {
      firebaseToolsPromise = Promise.all([
        import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"),
        import("https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js")
      ]).then(function (modules) {
        const appModule = modules[0];
        const databaseModule = modules[1];
        const config = getRemoteConfig();
        const app = appModule.initializeApp(config.firebaseConfig, config.firebaseConfig.projectId || config.eventId);

        return {
          app,
          db: databaseModule.getDatabase(app),
          ref: databaseModule.ref,
          get: databaseModule.get,
          set: databaseModule.set
        };
      });
    }

    if (!hasRemoteConfig()) {
      throw new Error("Falta configurar event-config.js con Firebase.");
    }

    return firebaseToolsPromise;
  }

  function createOverlay(message) {
    let overlay = document.getElementById(OVERLAY_ID);

    if (overlay) {
      const textNode = overlay.querySelector("[data-event-access-message]");

      if (textNode) {
        textNode.textContent = message;
      }

      return overlay;
    }

    overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    overlay.setAttribute("aria-live", "assertive");
    overlay.setAttribute("role", "alertdialog");
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.zIndex = "999999";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.padding = "24px";
    overlay.style.background = "rgba(34, 30, 24, 0.78)";
    overlay.style.backdropFilter = "blur(5px)";

    const panel = document.createElement("div");
    panel.style.width = "min(92vw, 520px)";
    panel.style.padding = "24px 22px";
    panel.style.borderRadius = "20px";
    panel.style.border = "1px solid rgba(185, 152, 65, 0.45)";
    panel.style.background = "#fffaf3";
    panel.style.boxShadow = "0 18px 45px rgba(0, 0, 0, 0.22)";
    panel.style.textAlign = "center";
    panel.style.color = "#4b463f";
    panel.style.fontFamily = '"Arapey", serif';
    panel.style.fontSize = "1.2rem";
    panel.style.lineHeight = "1.45";

    const textNode = document.createElement("p");
    textNode.setAttribute("data-event-access-message", "true");
    textNode.style.margin = "0";
    textNode.textContent = message;

    panel.appendChild(textNode);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return overlay;
  }

  function removeOverlay() {
    const overlay = document.getElementById(OVERLAY_ID);

    if (overlay) {
      overlay.remove();
    }

    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }

  async function fetchStatus(eventId) {
    const config = getRemoteConfig();
    const firebase = await getFirebaseTools();
    const snapshot = await firebase.get(firebase.ref(firebase.db, config.accessPath));
    const data = snapshot.exists() ? snapshot.val() : null;

    return {
      eventId,
      isActive: data && typeof data.isActive === "boolean" ? data.isActive : true,
      updatedAt: data && data.updatedAt ? data.updatedAt : null
    };
  }

  async function updateStatus(isActive) {
    const config = getRemoteConfig();
    const firebase = await getFirebaseTools();

    await firebase.set(firebase.ref(firebase.db, config.accessPath), {
      isActive,
      updatedAt: new Date().toISOString()
    });

    return {
      eventId: config.eventId,
      isActive,
      updatedAt: new Date().toISOString()
    };
  }

  async function enforcePublicAccess(options) {
    const { eventId, inactiveMessage } = options;

    try {
      const status = await fetchStatus(eventId);

      if (status.isActive === false) {
        createOverlay(inactiveMessage);
        return status;
      }

      removeOverlay();
      return status;
    } catch (error) {
      console.error(error);
      removeOverlay();
      return {
        eventId,
        isActive: true,
        fallback: true
      };
    }
  }

  window.EventAccess = {
    fetchStatus,
    enforcePublicAccess,
    getRemoteConfig,
    hasRemoteConfig,
    updateStatus
  };
})();
