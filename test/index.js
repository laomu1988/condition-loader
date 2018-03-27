
// #if DEBUG
console.log('DEBUG')
    // #if version < 1
    console.log('version < 0')
    // #elseif version < 2
    console.log('version > 1 and version < 2')
    // #endif
// #endif

// #if DEBUG -->
// DEBUG output with -->
// #endif

/* #if DEBUG */
// DEBUG output with * and /
// #endif