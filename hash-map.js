const node = (value = null, next = null) => {
    return {
        value,
        next
    };
}

const hashMap = (() => {
    let bucket = [];

    function bucketGenerator(n) {
        for (let i = 1; i <= n; i++) {
            bucket.push(node());
        }

        return hashMap;
    }

    function hash(key) {
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % bucket.length;
        }
        return hashCode;
    }

    function set(key, value) {
        let hashCode = hash(key);
        let loc = bucket[hashCode];
        let keyValue = {};
        keyValue[key] = value;

        while (loc.next !== null) {
            loc = loc.next;
        }

        if (loc.value && loc.key !== null) {
            let temp = node();
            temp.value = keyValue;
            loc.next = temp;
        } else {
            loc.value = keyValue;
        }

        return bucket;
    }
    
    function get(key) {
        let hashCode = hash(key);
        let loc = bucket[hashCode];
        let value;

        if (loc.value === null) return null;
        if (Object.keys(loc.value)[0] !== key && loc.next === null) return null;

        while (Object.keys(loc.value)[0] !== key) {
            loc = loc.next;
        }

        value = loc.value[key];

        return value;
    }

    function has(key) {
        let hashCode = hash(key);
        let loc = bucket[hashCode];

        if (loc.value === null) return false;
        if (Object.keys(loc.value)[0] !== key && loc.next === null) return false;

        while (Object.keys(loc.value)[0] !== key) {
            loc = loc.next;
        }

        return true;
    }

    function remove(key) {
        let hashCode = hash(key);
        let loc = bucket[hashCode];

        if (loc.value === null) return false;
        if (Object.keys(loc.value)[0] !== key && loc.next === null) return false;
        if (Object.keys(loc.value)[0] === key && loc.next === null) {
            loc.value = null;
            return true;
        }

        while (Object.keys(loc.next.value)[0] !== key) {
            loc = loc.next;
        }

        let temp = loc.next.next;
        loc.next = temp;

        return true;
    }

    return {
        bucketGenerator,
        hash,
        set,
        get,
        has,
        remove,
    }
})();

hashMap.bucketGenerator(16);
console.log(hashMap.set("banana", "john smith"));
console.log(hashMap.get("banana"));
console.log(hashMap.get("banan"));
console.log(hashMap.has("banana"));
console.log(hashMap.has("banan"));
console.log(hashMap.set("e", "jane doe"));
console.log(hashMap.remove('e'));
console.log(hashMap.remove('e'));
console.log(hashMap.set("banan", "jane doe"));
console.log(hashMap.remove('banan'));
console.log(hashMap.remove('banan'));


