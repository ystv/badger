// Init script. Injected into the browser window before any other script.

// Mock out MainStoreAPI.
const initialState = {};
window.MainStoreAPI = {
  _dispatch: async function (_action) {},
  onStateChange: function (_callback) {},
  getState: async function () {
    return initialState;
  },
};
