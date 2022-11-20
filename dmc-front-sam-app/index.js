exports.handler = async (event, context) => {
    const { handler  } = await import('./nuxt-output/server/index.mjs');
    const result = await handler (event);
    
    return result;
}
