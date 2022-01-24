(self["webpackChunksensen_jutsu"] = self["webpackChunksensen_jutsu"] || []).push([["basic"],{

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ejs */ "./node_modules/ejs/lib/ejs.js");
/* harmony import */ var ejs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ejs__WEBPACK_IMPORTED_MODULE_0__);

const SyntaxVariablesRegExp = new RegExp('{{(.*?)}}', 'g');
const SyntaxNativeRegExp = new RegExp('{%(.*?)%}', 'g');
const SyDetr = '%sn';
/**
 * Element Attributes Observer
 */
function $DOMAttributesObserver(html, callback) {
    if (html.attributes) {
        const attributes = Object.values(html.attributes);
        if (attributes.length) {
            attributes.map(attribute => {
                const matches = [...attribute.value.matchAll(SyntaxVariablesRegExp)];
                matches.map((match, k) => { matches[k][1] = matches[k][1].trim(); });
                callback({
                    element: html,
                    attribute: true,
                    attributeName: attribute.name,
                    content: false,
                    matches: matches,
                    mockup: html.cloneNode(true)
                });
            });
        }
    }
    return $DOMAttributesObserver;
}
/**
 * Element Content Observer
 */
function $DOMContentObserver(html, callback) {
    const matches = [...html.innerText.matchAll(SyntaxVariablesRegExp)];
    if (matches.length) {
        matches.map((match, k) => { matches[k][1] = matches[k][1].trim(); });
        callback({
            element: html,
            attribute: false,
            content: true,
            matches: matches,
            mockup: html.cloneNode(true)
        });
    }
    return $DOMContentObserver;
}
/**
 * Element Observer
 */
function $DOMObserver(html, callback) {
    const children = Object.values(html.children);
    if (children.length) {
        children.map(e => {
            $DOMAttributesObserver(e, callback);
            $JSObserver(e, callback);
            $DOMObserver(e, callback);
        });
    }
    else {
        $DOMContentObserver(html, callback);
    }
    return $DOMObserver;
}
/**
 * Observe JS Code in Element
 */
function $JSObserver(html, callback) {
    const matches = [...html.innerText.matchAll(SyntaxNativeRegExp)];
    if (matches.length) {
        matches.map((match, k) => { matches[k][1] = matches[k][1].trim(); });
        callback({
            element: html,
            isNative: true,
            matches: matches,
            mockup: html.cloneNode(true)
        });
    }
    return $DOMContentObserver;
}
/**
 * Find Transaction expressions in JS Expression
 */
function $JSFindTransactions(html, transactions, callback) {
    if (transactions) {
        const $transactions = Object.entries(transactions);
        if ($transactions.length) {
            $transactions.map(entry => {
                const matches = [...StabilizeContent(html.innerHTML).matchAll(new RegExp(`${entry[0]}`, 'g'))];
                if (matches.length) {
                    // console.warn('$JSFindTransactions', entry, matches)
                    callback({
                        element: html,
                        isNative: true,
                        content: true,
                        matches: matches,
                        mockup: html.cloneNode(true)
                    });
                }
            });
        }
    }
    return $JSFindTransactions;
}
/**
 * Fragment rendering from String
 */
function FragmentRender(input, dictionary) {
    return (0,ejs__WEBPACK_IMPORTED_MODULE_0__.render)(`${input}`, dictionary, {
        delimiter: `${SyDetr}`,
        client: true
    });
}
/**
 * Parse Node of Component
 */
function ParseNodeState(component, node) {
    $DOMObserver(node, (record) => {
        if (record.matches.length) {
            // @ts-ignore
            record.element.$context = component.$state;
            if (!record.isNative) {
                record.matches.map(match => {
                    const key = match[1];
                    if (key in component.$transactions) {
                        component.PushRef(key, record);
                        component.UpgradeTransaction(key);
                    }
                    // else{
                    //     console.log('Not supported', key, record, window.StaticSensenJutsuInstance[ component.$staticKey ] )
                    // }
                });
            }
        }
    });
}
/**
 *  Parse Recorded
 */
function ParseRecord(component, record, match) {
    if (record.content) {
        record.element.innerHTML = FragmentRender(((record.mockup?.innerHTML || '')
            .replace(new RegExp(match[0]), `<${SyDetr}=${match[1]}${SyDetr}>`)), component.$transactions || {});
    }
    if (record.attribute) {
        if (record.attributeName) {
            record.element.setAttribute(record.attributeName, FragmentRender(((record.mockup?.getAttribute(record.attributeName) || '').replace(new RegExp(match[0]), `<${SyDetr}=${match[1]}${SyDetr}>`)), component.$transactions || {}));
        }
    }
    return ParseRecord;
}
function StabilizeContent(content) {
    return (content || '').replace(/&gt;/g, `>`).replace(/&lt;/g, `<`);
}
class SensenJutsu {
    // #$props : SensenTJutsuProps<V> = {} as SensenTJutsuProps<V>
    /**
     * New Construct
     */
    constructor(props) {
        // this.props = props;
        this.$staticKey = 0;
        this.$element = document.body;
        this.$virtualization = null;
        this.$transactions = {};
        this.$state = {};
        this.$refs = {};
        this.Init(props).States().Render();
    }
    Init(props) {
        // this.#$props = props;
        this.$element = (props.element instanceof HTMLElement)
            ? props.element
            : (typeof props.element == 'string'
                ? document.querySelector(`${props.element}`)
                : null);
        this.$transactions = props.transactions || {};
        this.$state = Object.assign({}, this.$transactions);
        window.StaticSensenJutsuInstance = window.StaticSensenJutsuInstance || [];
        this.$staticKey = window.StaticSensenJutsuInstance.length;
        window.StaticSensenJutsuInstance[this.$staticKey] = this;
        return this;
    }
    UpgradeTransaction(key) {
        if (key in this.$refs) {
            const records = this.$refs[key];
            records?.map(record => {
                if (record) {
                    record.matches.map(match => {
                        if (!record.isNative) {
                            ParseRecord(this, record, match);
                        }
                        else {
                            if (record.content) {
                                const computed = FragmentRender(StabilizeContent(record.mockup?.innerHTML || ''), this.$transactions);
                                record.element.innerHTML = computed;
                                $DOMObserver(record.element, (rec) => {
                                    if (rec.matches.length) {
                                        Object.values(rec.matches).map(mat => {
                                            this.PushRef(mat[1], rec);
                                            ParseRecord(this, rec, mat);
                                        });
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }
        return this;
    }
    States() {
        if (this.$state) {
            const $_states = Object.entries(this.$state);
            /**
             * States
             */
            if ($_states.length) {
                const self = this;
                /**
                 * Pre-Build States
                 */
                $_states.map(e => {
                    if (typeof e[1] == 'string') {
                        const name = e[0];
                        const finder = [...e[1].matchAll(SyntaxVariablesRegExp)];
                        if (finder.length) {
                            finder.map(found => {
                                found[1] = found[1].trim();
                                this.$transactions[name] = e[1].replace(new RegExp(`${found[0]}`), this.$state[found[1]]);
                            });
                        }
                    }
                });
                /**
                 * Build States
                 */
                const $states = Object.entries(this.$state);
                $states.map(e => {
                    const name = e[0];
                    /**
                     * Objects
                     */
                    if (typeof e[1] == 'object') {
                        /**
                         * Is Array
                         */
                        if (Array.isArray(e[1])) {
                            this.$state[name] = new Proxy(e[1], {
                                set(target, prop, receive) {
                                    if (typeof target[prop] == 'function') {
                                        (() => {
                                            console.warn('SET MOVE With Function', prop);
                                            return target[prop];
                                        }).apply(target, typeof receive == 'object' ? receive : [receive]);
                                    }
                                    else {
                                        target[prop] = receive;
                                    }
                                    self.$transactions[name] = target;
                                    self.UpgradeTransaction(name);
                                    return true;
                                }
                            });
                            this.$transactions[name] = this.$state[name];
                            this.$state[name][0] = ('Teston');
                        }
                        else {
                            console.warn('State of Object', e);
                        }
                    }
                    else {
                        Object.defineProperty(this.$state, `${name}`, {
                            get: function () { return self.$transactions[name]; },
                            set: function (value) {
                                self.$transactions[name] = value;
                                self.UpgradeTransaction(name);
                            },
                        });
                    }
                });
            }
        }
        return this;
    }
    PushRef(key, record) {
        this.$refs[key] = this.$refs[key] || [];
        this.$refs[key]?.push(record);
        return this;
    }
    Render() {
        if (this.$element instanceof HTMLElement) {
            this.$virtualization = (new DOMParser()).parseFromString(this.$element.innerHTML, 'text/html');
            /**
             * Traitement des expressions Native
             */
            $DOMObserver(this.$virtualization.body, (record) => {
                if (record.matches.length) {
                    // @ts-ignore
                    record.element.$context = this.$state;
                    if (record.isNative) {
                        if (record.matches) {
                            record.matches.map(match => {
                                record.element.innerHTML = (StabilizeContent(record.element.innerHTML || '').replace(match[0], `<${SyDetr}${match[1]}${SyDetr}>`));
                            });
                            $JSFindTransactions(record.element, this.$transactions, (rec) => {
                                if (rec.isNative) {
                                    if (rec.matches.length) {
                                        rec.matches.map(mat => {
                                            this.PushRef(mat[0], rec);
                                        });
                                    }
                                }
                            });
                            try {
                                record.element.innerHTML = `${FragmentRender(StabilizeContent(record.element.innerHTML || ''), this.$transactions)}`;
                            }
                            catch (e) {
                                console.log('Error detected', e);
                            }
                        }
                    }
                }
            });
            /**
             * Traitement des transactions
             */
            ParseNodeState(this, this.$virtualization.body);
            /**
             * Mise à jour
             */
            this.$element.innerHTML = '';
            const children = Object.values(this.$virtualization.body.children);
            if (children.length) {
                children.map(child => {
                    this.$element?.appendChild(child);
                });
            }
        }
        return this;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SensenJutsu);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9jb3JlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFPN0IsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFFMUQsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFFdkQsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFBO0FBS3BCOztHQUVHO0FBQ0gsU0FBUyxzQkFBc0IsQ0FBQyxJQUFpQixFQUFFLFFBQXVEO0lBRXRHLElBQUcsSUFBSSxDQUFDLFVBQVUsRUFBQztRQUVmLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBRSxDQUFDO1FBRXBELElBQUcsVUFBVSxDQUFDLE1BQU0sRUFBQztZQUVqQixVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQSxFQUFFO2dCQUV0QixNQUFNLE9BQU8sR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO2dCQUVyRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBQyxFQUFFLEdBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUVqRSxRQUFRLENBQUM7b0JBQ0wsT0FBTyxFQUFFLElBQUk7b0JBQ2IsU0FBUyxFQUFFLElBQUk7b0JBQ2YsYUFBYSxFQUFFLFNBQVMsQ0FBQyxJQUFJO29CQUM3QixPQUFPLEVBQUUsS0FBSztvQkFDZCxPQUFP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QUVmLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBRWpCLElBQUksQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUV0QyxDQUFDLENBQUMsQ0FBQTthQUVMO1NBRUo7UUFHRCxPQUFPLElBQUksQ0FBQztJQUVoQixDQUFDO0NBRUo7QUFPRCxlQUFlLFdBQVcsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgU2Vuc2VuVEp1dHN1T2JzZXJ2ZXJSZWNvcmRzLCBTZW5zZW5USnV0c3VQcm9wcywgU2Vuc2VuVFdpbmRvdyB9IGZyb20gXCIuL2luZGV4LnRcIjtcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ2Vqcyc7XG5pbXBvcnQgeyBtYXRjaCB9IGZyb20gXCJhc3NlcnRcIjtcblxuXG5kZWNsYXJlIGxldCB3aW5kb3c6IFNlbnNlblRXaW5kb3c7XG5cblxuY29uc3QgU3ludGF4VmFyaWFibGVzUmVnRXhwID0gbmV3IFJlZ0V4cCgne3soLio/KX19JywgJ2cnKVxuXG5jb25zdCBTeW50YXhOYXRpdmVSZWdFeHAgPSBuZXcgUmVnRXhwKCd7JSguKj8pJX0nLCAnZycpXG5cbmNvbnN0IFN5RGV0ciA9ICclc24nXG5cblxuXG5cbi8qKlxuICogRWxlbWVudCBBdHRyaWJ1dGVzIE9ic2VydmVyXG4gKi9cbmZ1bmN0aW9uICRET01BdHRyaWJ1dGVzT2JzZXJ2ZXIoaHRtbDogSFRNTEVsZW1lbnQsIGNhbGxiYWNrOiAocmVjb3JkOiBTZW5zZW5USnV0c3VPYnNlcnZlclJlY29yZHMpID0+IHZvaWQpe1xuXG4gICAgaWYoaHRtbC5hdHRyaWJ1dGVzKXtcblxuICAgICAgICBjb25zdCBhdHRyaWJ1dGVzID0gT2JqZWN0LnZhbHVlcyggaHRtbC5hdHRyaWJ1dGVzICk7XG5cbiAgICAgICAgaWYoYXR0cmlidXRlcy5sZW5ndGgpe1xuXG4gICAgICAgICAgICBhdHRyaWJ1dGVzLm1hcChhdHRyaWJ1dGU9PntcblxuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoZXMgPSBbLi4uYXR0cmlidXRlLnZhbHVlLm1hdGNoQWxsKFN5bnRheFZhcmlhYmxlc1JlZ0V4cCldO1xuXG4gICAgICAgICAgICAgICAgbWF0Y2hlcy5tYXAoKG1hdGNoLCBrKT0+eyBtYXRjaGVzW2tdWzFdID0gbWF0Y2hlc1trXVsxXS50cmltKCkgfSlcblxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogaHRtbCxcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVOYW1lOiBhdHRyaWJ1dGUubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoZXM6IG1hdGNoZXMsXG4gICAgICAgICAgICAgICAgICAgIG1vY2t1cDogaHRtbC5jbG9uZU5vZGUodHJ1ZSkgYXMgSFRNTEVsZW1lbnRcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgcmV0dXJuICRET01BdHRyaWJ1dGVzT2JzZXJ2ZXI7XG4gICAgXG59XG5cblxuXG5cbi8qKlxuICogRWxlbWVudCBDb250ZW50IE9ic2VydmVyXG4gKi9cbmZ1bmN0aW9uICRET01Db250ZW50T2JzZXJ2ZXIoaHRtbDogSFRNTEVsZW1lbnQsIGNhbGxiYWNrOiAocmVjb3JkOiBTZW5zZW5USnV0c3VPYnNlcnZlclJlY29yZHMpID0+IHZvaWQpe1xuXG4gICAgY29uc3QgbWF0Y2hlcyA9IFsuLi5odG1sLmlubmVyVGV4dC5tYXRjaEFsbChTeW50YXhWYXJpYWJsZXNSZWdFeHApXTtcblxuICAgIGlmKG1hdGNoZXMubGVuZ3RoKXtcblxuICAgICAgICBtYXRjaGVzLm1hcCgobWF0Y2gsIGspPT57IG1hdGNoZXNba11bMV0gPSBtYXRjaGVzW2tdWzFdLnRyaW0oKSB9KVxuXG4gICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IGh0bWwsXG4gICAgICAgICAgICBhdHRyaWJ1dGU6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudDogdHJ1ZSxcbiAgICAgICAgICAgIG1hdGNoZXM6IG1hdGNoZXMsXG4gICAgICAgICAgICBtb2NrdXA6IGh0bWwuY2xvbmVOb2RlKHRydWUpIGFzIEhUTUxFbGVtZW50XG4gICAgICAgIH0pXG5cbiAgICB9XG5cblxuICAgIHJldHVybiAkRE9NQ29udGVudE9ic2VydmVyO1xuXG59XG5cblxuXG5cbi8qKlxuICogRWxlbWVudCBPYnNlcnZlclxuICovXG5mdW5jdGlvbiAkRE9NT2JzZXJ2ZXIoaHRtbDogSFRNTEVsZW1lbnQsIGNhbGxiYWNrOiAocmVjb3JkOiBTZW5zZW5USnV0c3VPYnNlcnZlclJlY29yZHMpID0+IHZvaWQpe1xuXG4gICAgY29uc3QgY2hpbGRyZW46IEhUTUxFbGVtZW50W10gPSBPYmplY3QudmFsdWVzKGh0bWwuY2hpbGRyZW4pIGFzIEhUTUxFbGVtZW50W11cblxuXG4gICAgaWYoY2hpbGRyZW4ubGVuZ3RoKXtcblxuICAgICAgICBjaGlsZHJlbi5tYXAoZT0+e1xuXG4gICAgICAgICAgICAkRE9NQXR0cmlidXRlc09ic2VydmVyKGUsIGNhbGxiYWNrKVxuXG4gICAgICAgICAgICAkSlNPYnNlcnZlcihlLCBjYWxsYmFjaylcblxuICAgICAgICAgICAgJERPTU9ic2VydmVyKGUsIGNhbGxiYWNrKVxuICAgICAgICAgICAgXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICBlbHNle1xuXG4gICAgICAgICRET01Db250ZW50T2JzZXJ2ZXIoaHRtbCwgY2FsbGJhY2spXG5cbiAgICB9XG5cbiAgICByZXR1cm4gJERPTU9ic2VydmVyO1xuXG59XG5cblxuXG5cbi8qKlxuICogT2JzZXJ2ZSBKUyBDb2RlIGluIEVsZW1lbnQgXG4gKi9cbiBmdW5jdGlvbiAkSlNPYnNlcnZlcihodG1sOiBIVE1MRWxlbWVudCwgY2FsbGJhY2s6IChyZWNvcmQ6IFNlbnNlblRKdXRzdU9ic2VydmVyUmVjb3JkcykgPT4gdm9pZCl7XG5cblxuICAgIGNvbnN0IG1hdGNoZXMgPSBbLi4uaHRtbC5pbm5lclRleHQubWF0Y2hBbGwoU3ludGF4TmF0aXZlUmVnRXhwKV07XG5cbiAgICBpZihtYXRjaGVzLmxlbmd0aCl7XG5cbiAgICAgICAgbWF0Y2hlcy5tYXAoKG1hdGNoLCBrKT0+eyBtYXRjaGVzW2tdWzFdID0gbWF0Y2hlc1trXVsxXS50cmltKCkgfSlcblxuICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgICBlbGVtZW50OiBodG1sLFxuICAgICAgICAgICAgaXNOYXRpdmU6IHRydWUsXG4gICAgICAgICAgICBtYXRjaGVzOiBtYXRjaGVzLFxuICAgICAgICAgICAgbW9ja3VwOiBodG1sLmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MRWxlbWVudFxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgcmV0dXJuICRET01Db250ZW50T2JzZXJ2ZXI7XG5cbn1cblxuXG5cblxuLyoqXG4gKiBGaW5kIFRyYW5zYWN0aW9uIGV4cHJlc3Npb25zIGluIEpTIEV4cHJlc3Npb25cbiAqL1xuZnVuY3Rpb24gJEpTRmluZFRyYW5zYWN0aW9uczxWPihodG1sOiBIVE1MRWxlbWVudCwgdHJhbnNhY3Rpb25zOiBWLCBjYWxsYmFjazogKHJlY29yZDogU2Vuc2VuVEp1dHN1T2JzZXJ2ZXJSZWNvcmRzKSA9PiB2b2lkKXtcblxuICAgIGlmKHRyYW5zYWN0aW9ucyl7XG5cbiAgICAgICAgY29uc3QgJHRyYW5zYWN0aW9ucyA9IE9iamVjdC5lbnRyaWVzKHRyYW5zYWN0aW9ucyk7XG5cbiAgICAgICAgaWYoJHRyYW5zYWN0aW9ucy5sZW5ndGgpe1xuXG4gICAgICAgICAgICAkdHJhbnNhY3Rpb25zLm1hcChlbnRyeT0+e1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hlcyA9IFsuLi5TdGFiaWxpemVDb250ZW50KGh0bWwuaW5uZXJIVE1MKS5tYXRjaEFsbChuZXcgUmVnRXhwKGAkeyBlbnRyeVswXSB9YCwgJ2cnKSldO1xuXG4gICAgICAgICAgICAgICAgaWYobWF0Y2hlcy5sZW5ndGgpe1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUud2FybignJEpTRmluZFRyYW5zYWN0aW9ucycsIGVudHJ5LCBtYXRjaGVzKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGh0bWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc05hdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVzOiBtYXRjaGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9ja3VwOiBodG1sLmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MRWxlbWVudFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbiAgICBcblxuICAgIHJldHVybiAkSlNGaW5kVHJhbnNhY3Rpb25zO1xuXG59XG5cblxuXG5cbi8qKlxuICogRnJhZ21lbnQgcmVuZGVyaW5nIGZyb20gU3RyaW5nXG4gKi9cbmZ1bmN0aW9uIEZyYWdtZW50UmVuZGVyKGlucHV0OiBzdHJpbmcsIGRpY3Rpb25hcnk6IHsgW0s6IHN0cmluZ10gOiBhbnkgIH0gKXtcbiAgICByZXR1cm4gcmVuZGVyKGAkeyBpbnB1dCB9YCwgZGljdGlvbmFyeSwge1xuICAgICAgICBkZWxpbWl0ZXI6IGAkeyBTeURldHIgfWAsXG4gICAgICAgIGNsaWVudDogdHJ1ZVxuICAgIH0pXG59XG5cblxuXG5cblxuXG5cbi8qKlxuICogUGFyc2UgTm9kZSBvZiBDb21wb25lbnRcbiAqL1xuZnVuY3Rpb24gUGFyc2VOb2RlU3RhdGU8Vj4oY29tcG9uZW50OiBTZW5zZW5KdXRzdTxWPiwgbm9kZTogSFRNTEVsZW1lbnQpe1xuXG4gICAgJERPTU9ic2VydmVyKG5vZGUsIChyZWNvcmQpPT57XG5cbiAgICAgICAgaWYocmVjb3JkLm1hdGNoZXMubGVuZ3RoKXtcblxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgcmVjb3JkLmVsZW1lbnQuJGNvbnRleHQgPSBjb21wb25lbnQuJHN0YXRlO1xuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIGlmKCFyZWNvcmQuaXNOYXRpdmUpe1xuXG4gICAgICAgICAgICAgICAgcmVjb3JkLm1hdGNoZXMubWFwKG1hdGNoPT57XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gbWF0Y2hbMV0gYXMga2V5b2YgVjtcblxuICAgICAgICAgICAgICAgICAgICBpZihrZXkgaW4gY29tcG9uZW50LiR0cmFuc2FjdGlvbnMpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQuUHVzaFJlZihrZXksIHJlY29yZClcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50LlVwZ3JhZGVUcmFuc2FjdGlvbihrZXkpXG5cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZWxzZXtcblxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ05vdCBzdXBwb3J0ZWQnLCBrZXksIHJlY29yZCwgd2luZG93LlN0YXRpY1NlbnNlbkp1dHN1SW5zdGFuY2VbIGNvbXBvbmVudC4kc3RhdGljS2V5IF0gKVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgIH0pXG4gICAgXG59XG5cblxuXG5cblxuXG4vKipcbiAqICBQYXJzZSBSZWNvcmRlZFxuICovXG5mdW5jdGlvbiBQYXJzZVJlY29yZDxWPihjb21wb25lbnQ6IFNlbnNlbkp1dHN1PFY+LCByZWNvcmQ6IFNlbnNlblRKdXRzdU9ic2VydmVyUmVjb3JkcywgbWF0Y2g6IFJlZ0V4cE1hdGNoQXJyYXkpe1xuXG4gICAgaWYocmVjb3JkLmNvbnRlbnQpe1xuICAgICAgICAgICAgICAgIFxuICAgICAgICByZWNvcmQuZWxlbWVudC5pbm5lckhUTUwgPSBGcmFnbWVudFJlbmRlcigoXG4gICAgICAgICAgICAocmVjb3JkLm1vY2t1cD8uaW5uZXJIVE1MfHwnJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZShuZXcgUmVnRXhwKG1hdGNoWzBdKSwgYDwke1N5RGV0cn09JHsgbWF0Y2hbMV0gfSR7U3lEZXRyfT5gIClcbiAgICAgICAgKSwgIGNvbXBvbmVudC4kdHJhbnNhY3Rpb25zIHx8IHt9IGFzIFYpXG5cbiAgICB9XG5cbiAgICBpZihyZWNvcmQuYXR0cmlidXRlKXtcblxuICAgICAgICBpZihyZWNvcmQuYXR0cmlidXRlTmFtZSApe1xuXG4gICAgICAgICAgICByZWNvcmQuZWxlbWVudC5zZXRBdHRyaWJ1dGUocmVjb3JkLmF0dHJpYnV0ZU5hbWUsIEZyYWdtZW50UmVuZGVyKChcbiAgICAgICAgICAgICAgICAocmVjb3JkLm1vY2t1cD8uZ2V0QXR0cmlidXRlKHJlY29yZC5hdHRyaWJ1dGVOYW1lKSB8fCAnJykucmVwbGFjZShuZXcgUmVnRXhwKG1hdGNoWzBdKSwgYDwke1N5RGV0cn09JHsgbWF0Y2hbMV0gfSR7U3lEZXRyfT5gIClcbiAgICAgICAgICAgICksICBjb21wb25lbnQuJHRyYW5zYWN0aW9ucyB8fCB7fSBhcyBWKSApXG5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICByZXR1cm4gUGFyc2VSZWNvcmQ7XG4gICAgXG59XG5cblxuXG5cblxuXG5cbmZ1bmN0aW9uIFN0YWJpbGl6ZUNvbnRlbnQoY29udGVudDogc3RyaW5nKSA6IHN0cmluZ3tcbiAgICByZXR1cm4gKGNvbnRlbnR8fCcnKS5yZXBsYWNlKC8mZ3Q7L2csIGA+YCkucmVwbGFjZSgvJmx0Oy9nLCBgPGApXG59XG5cblxuXG5cblxuXG5cbmNsYXNzIFNlbnNlbkp1dHN1PFYgZXh0ZW5kcyB7IFtLOiBzdHJpbmddIDogYW55LCAkY29udGV4dD86IFYgfT57XG5cblxuICAgICRzdGF0aWNLZXk6IG51bWJlciA9IDA7XG5cbiAgICAkZWxlbWVudD86IEhUTUxFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LmJvZHk7XG5cbiAgICAkZnJvbVN0cmluZz86IHN0cmluZztcblxuICAgICR2aXJ0dWFsaXphdGlvbjogRG9jdW1lbnQgfCBudWxsID0gbnVsbDtcblxuICAgICR0cmFuc2FjdGlvbnM6IFYgPSB7fSBhcyBWO1xuXG4gICAgJHN0YXRlOiBWID0ge30gYXMgVjtcblxuICAgICRyZWZzOiB7IFtSZSBpbiBrZXlvZiBWXSA/OiBBcnJheTxTZW5zZW5USnV0c3VPYnNlcnZlclJlY29yZHM+IH0gPSB7fTtcblxuICAgIC8vICMkcHJvcHMgOiBTZW5zZW5USnV0c3VQcm9wczxWPiA9IHt9IGFzIFNlbnNlblRKdXRzdVByb3BzPFY+XG4gICAgXG5cbiAgICAvKipcbiAgICAgKiBOZXcgQ29uc3RydWN0XG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJvcHM6IFNlbnNlblRKdXRzdVByb3BzPFY+KXtcblxuICAgICAgICAvLyB0aGlzLnByb3BzID0gcHJvcHM7XG5cbiAgICAgICAgdGhpcy5Jbml0KHByb3BzKS5TdGF0ZXMoKS5SZW5kZXIoKTtcblxuICAgIH1cblxuICAgIEluaXQocHJvcHM6IFNlbnNlblRKdXRzdVByb3BzPFY+KXtcblxuICAgICAgICAvLyB0aGlzLiMkcHJvcHMgPSBwcm9wcztcblxuICAgICAgICB0aGlzLiRlbGVtZW50ID0gKHByb3BzLmVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgID8gcHJvcHMuZWxlbWVudCBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgOiAoXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdHlwZW9mIHByb3BzLmVsZW1lbnQgPT0gJ3N0cmluZycgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHsgcHJvcHMuZWxlbWVudCB9YCkgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICApXG5cbiAgICAgICAgdGhpcy4kdHJhbnNhY3Rpb25zID0gcHJvcHMudHJhbnNhY3Rpb25zIHx8IHt9IGFzIFY7XG5cbiAgICAgICAgdGhpcy4kc3RhdGUgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLiR0cmFuc2FjdGlvbnMpXG5cblxuICAgICAgICB3aW5kb3cuU3RhdGljU2Vuc2VuSnV0c3VJbnN0YW5jZSA9IHdpbmRvdy5TdGF0aWNTZW5zZW5KdXRzdUluc3RhbmNlIHx8IFtdXG4gICAgICAgIFxuICAgICAgICB0aGlzLiRzdGF0aWNLZXkgPSB3aW5kb3cuU3RhdGljU2Vuc2VuSnV0c3VJbnN0YW5jZS5sZW5ndGg7XG5cbiAgICAgICAgd2luZG93LlN0YXRpY1NlbnNlbkp1dHN1SW5zdGFuY2VbIHRoaXMuJHN0YXRpY0tleSBdID0gdGhpc1xuXG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cblxuXG5cblxuICAgIFVwZ3JhZGVUcmFuc2FjdGlvbihrZXkgOiBrZXlvZiBWKXtcblxuXG4gICAgICAgIGlmKGtleSBpbiB0aGlzLiRyZWZzKXtcblxuICAgICAgICAgICAgY29uc3QgcmVjb3JkcyA9IHRoaXMuJHJlZnNbIGtleSBdO1xuXG4gICAgICAgICAgICByZWNvcmRzPy5tYXAocmVjb3JkPT57XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZihyZWNvcmQpe1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmVjb3JkLm1hdGNoZXMubWFwKG1hdGNoPT57XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFyZWNvcmQuaXNOYXRpdmUpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUGFyc2VSZWNvcmQ8Vj4odGhpcywgcmVjb3JkLCBtYXRjaCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlY29yZC5jb250ZW50KXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wdXRlZCA9IEZyYWdtZW50UmVuZGVyKFN0YWJpbGl6ZUNvbnRlbnQocmVjb3JkLm1vY2t1cD8uaW5uZXJIVE1MfHwnJyksIHRoaXMuJHRyYW5zYWN0aW9ucyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjb3JkLmVsZW1lbnQuaW5uZXJIVE1MID0gY29tcHV0ZWRcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkRE9NT2JzZXJ2ZXIocmVjb3JkLmVsZW1lbnQsIChyZWMpPT57XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlYy5tYXRjaGVzLmxlbmd0aCl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QudmFsdWVzKHJlYy5tYXRjaGVzKS5tYXAobWF0PT57XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5QdXNoUmVmKG1hdFsxXSwgcmVjKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhcnNlUmVjb3JkPFY+KHRoaXMsIHJlYywgbWF0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgIFxuICAgICAgICAgICAgfSlcbiAgICBcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgXG4gICAgfVxuXG5cblxuXG5cbiAgICBTdGF0ZXMoKXtcblxuICAgICAgICBpZih0aGlzLiRzdGF0ZSl7XG5cbiAgICAgICAgICAgIGNvbnN0ICRfc3RhdGVzID0gT2JqZWN0LmVudHJpZXModGhpcy4kc3RhdGUpO1xuXG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBTdGF0ZXNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYoJF9zdGF0ZXMubGVuZ3RoKXtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogUHJlLUJ1aWxkIFN0YXRlc1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICRfc3RhdGVzLm1hcChlPT57XG5cbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mIGVbMV0gPT0gJ3N0cmluZycpe1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gZVswXSBhcyBrZXlvZiBWO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaW5kZXIgPSBbLi4uZVsxXS5tYXRjaEFsbChTeW50YXhWYXJpYWJsZXNSZWdFeHApXVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihmaW5kZXIubGVuZ3RoKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmRlci5tYXAoZm91bmQ9PntcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3VuZFsxXSA9IGZvdW5kWzFdLnRyaW0oKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHRyYW5zYWN0aW9uc1sgbmFtZSBdID0gZVsxXS5yZXBsYWNlKG5ldyBSZWdFeHAoYCR7IGZvdW5kWzBdIH1gKSwgdGhpcy4kc3RhdGVbIGZvdW5kWzFdIF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQnVpbGQgU3RhdGVzXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc3QgJHN0YXRlcyA9IE9iamVjdC5lbnRyaWVzKHRoaXMuJHN0YXRlKTtcbiAgICBcbiAgICAgICAgICAgICAgICAkc3RhdGVzLm1hcChlPT57XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGVbMF0gYXMga2V5b2YgVjtcblxuXG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBPYmplY3RzXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YgZVsxXSA9PSAnb2JqZWN0Jyl7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBJcyBBcnJheVxuICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKEFycmF5LmlzQXJyYXkoZVsxXSkpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc3RhdGVbIG5hbWUgXSA9IG5ldyBQcm94eTx0eXBlb2YgZVsxXT4oZVsxXSwge1xuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXQodGFyZ2V0LCBwcm9wLCByZWNlaXZlKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mIHRhcmdldFtwcm9wXSA9PSAnZnVuY3Rpb24nKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1NFVCBNT1ZFIFdpdGggRnVuY3Rpb24nLCBwcm9wKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0W3Byb3BdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuYXBwbHkodGFyZ2V0LCB0eXBlb2YgcmVjZWl2ZSA9PSAnb2JqZWN0JyA/IHJlY2VpdmUgOiBbcmVjZWl2ZV0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W3Byb3BdID0gcmVjZWl2ZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiR0cmFuc2FjdGlvbnNbIG5hbWUgXSA9IHRhcmdldFxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLlVwZ3JhZGVUcmFuc2FjdGlvbiggbmFtZSApXG4gICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kdHJhbnNhY3Rpb25zWyBuYW1lIF0gPSB0aGlzLiRzdGF0ZVsgbmFtZSBdXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdGF0ZVsgbmFtZSBdWzBdID0gKCdUZXN0b24nKVxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdTdGF0ZSBvZiBPYmplY3QnLCBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy4kc3RhdGUsIGAkeyBuYW1lIH1gLCB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiBzZWxmLiR0cmFuc2FjdGlvbnNbIG5hbWUgXTsgfSxcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kdHJhbnNhY3Rpb25zWyBuYW1lIF0gPSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5VcGdyYWRlVHJhbnNhY3Rpb24oIG5hbWUgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICBcbiAgICB9XG4gICAgXG5cblxuICAgIFB1c2hSZWYoa2V5OiBrZXlvZiBWLCByZWNvcmQ6IFNlbnNlblRKdXRzdU9ic2VydmVyUmVjb3Jkcyl7XG5cbiAgICAgICAgdGhpcy4kcmVmc1sga2V5IF0gPSB0aGlzLiRyZWZzWyBrZXkgXSB8fCBbXTtcblxuICAgICAgICB0aGlzLiRyZWZzWyBrZXkgXT8ucHVzaChyZWNvcmQpXG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIFxuICAgIH1cbiAgICBcblxuXG5cbiAgICBcblxuICAgIFxuXG4gICAgUmVuZGVyKCl7XG5cblxuICAgICAgICBpZih0aGlzLiRlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpe1xuXG4gICAgICAgICAgICB0aGlzLiR2aXJ0dWFsaXphdGlvbiA9IChuZXcgRE9NUGFyc2VyKCkpLnBhcnNlRnJvbVN0cmluZyh0aGlzLiRlbGVtZW50LmlubmVySFRNTCwgJ3RleHQvaHRtbCcpXG5cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBUcmFpdGVtZW50IGRlcyBleHByZXNzaW9ucyBOYXRpdmVcbiAgICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICAgJERPTU9ic2VydmVyKHRoaXMuJHZpcnR1YWxpemF0aW9uLmJvZHksIChyZWNvcmQpPT57XG5cbiAgICAgICAgICAgICAgICBpZihyZWNvcmQubWF0Y2hlcy5sZW5ndGgpe1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgcmVjb3JkLmVsZW1lbnQuJGNvbnRleHQgPSB0aGlzLiRzdGF0ZTtcblxuICAgICAgICAgICAgICAgICAgICBpZihyZWNvcmQuaXNOYXRpdmUpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZWNvcmQubWF0Y2hlcyl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNvcmQubWF0Y2hlcy5tYXAobWF0Y2g9PntcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNvcmQuZWxlbWVudC5pbm5lckhUTUwgPSAoU3RhYmlsaXplQ29udGVudChyZWNvcmQuZWxlbWVudC5pbm5lckhUTUx8fCcnKS5yZXBsYWNlKG1hdGNoWzBdLCBgPCR7U3lEZXRyfSR7IG1hdGNoWzFdIH0ke1N5RGV0cn0+YCkpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJEpTRmluZFRyYW5zYWN0aW9uczxWPihyZWNvcmQuZWxlbWVudCwgdGhpcy4kdHJhbnNhY3Rpb25zLCAocmVjKT0+e1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlYy5pc05hdGl2ZSl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlYy5tYXRjaGVzLmxlbmd0aCl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWMubWF0Y2hlcy5tYXAobWF0PT57XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5QdXNoUmVmKG1hdFswXSBhcyBrZXlvZiBWLCByZWMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5e1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY29yZC5lbGVtZW50LmlubmVySFRNTCA9IGAkeyBGcmFnbWVudFJlbmRlcihTdGFiaWxpemVDb250ZW50KHJlY29yZC5lbGVtZW50LmlubmVySFRNTHx8JycpLCB0aGlzLiR0cmFuc2FjdGlvbnMpIH1gXG4gICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWNhdGNoKGUpe1xuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgZGV0ZWN0ZWQnLCBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cblxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRyYWl0ZW1lbnQgZGVzIHRyYW5zYWN0aW9uc1xuICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgIFBhcnNlTm9kZVN0YXRlPFY+KHRoaXMsIHRoaXMuJHZpcnR1YWxpemF0aW9uLmJvZHkpXG5cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBNaXNlIMOgIGpvdXJcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5pbm5lckhUTUwgPSAnJztcblxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBPYmplY3QudmFsdWVzKCB0aGlzLiR2aXJ0dWFsaXphdGlvbi5ib2R5LmNoaWxkcmVuICk7XG5cbiAgICAgICAgICAgIGlmKGNoaWxkcmVuLmxlbmd0aCl7XG5cbiAgICAgICAgICAgICAgICBjaGlsZHJlbi5tYXAoY2hpbGQgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQ/LmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIFxuICAgIH1cblxufVxuXG5cblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgU2Vuc2VuSnV0c3VcblxuIl19

/***/ }),

/***/ "./lib/test.js":
/*!*********************!*\
  !*** ./lib/test.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./lib/index.js");

const vm = new _index__WEBPACK_IMPORTED_MODULE_0__["default"]({
    element: '#app',
    transactions: {
        title: 'Hello les gens',
        message: 'Lorem ipsum {{ counter }}',
        route: 'comingsoon',
        counter: 0,
        persons: [
            'Yann',
            'Christina',
            'Myana',
            'Syana'
        ],
        // persons: new Proxy<string[]>([
        //     'Yann',
        //     'Christina',
        //     'Myana',
        //     'Syana'
        // ], {
        //     get(t,p,r){
        //         console.log('GET STATE', t, p, r)
        //         //@ts-ignore
        //         return t[p]
        //     },
        //     set(t,p,r){
        //         t[p] = r
        //         console.warn('SET STATE', t, p, r)
        //         return true
        //     }
        // }),
        increment() {
            this.persons[1] = ('IanCarter Now');
            this.counter++;
            // this.message = `We count to ${ this.counter }`
            console.log('Increment', this.counter, this.persons);
        }
    },
});
console.warn('VM', vm);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2NvcmUvdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSxTQUFTLENBQUM7QUFHbEMsTUFBTSxFQUFFLEdBQUcsSUFBSSxXQUFXLENBQUM7SUFFdkIsT0FBTyxFQUFFLE1BQU07SUFFZixZQUFZLEVBQUM7UUFFVCxLQUFLLEVBQUUsZ0JBQWdCO1FBRXZCLE9BQU8sRUFBRSwyQkFBMkI7UUFFcEMsS0FBSyxFQUFFLFlBQVk7UUFFbkIsT0FBTyxFQUFFLENBQUM7UUFFVixPQUFPLEVBQUU7WUFDTCxNQUFNO1lBQ04sV0FBVztZQUNYLE9BQU87WUFDUCxPQUFPO1NBQ1Y7UUFHRCxpQ0FBaUM7UUFDakMsY0FBYztRQUNkLG1CQUFtQjtRQUNuQixlQUFlO1FBQ2YsY0FBYztRQUNkLE9BQU87UUFDUCxrQkFBa0I7UUFFbEIsNENBQTRDO1FBRTVDLHVCQUF1QjtRQUN2QixzQkFBc0I7UUFDdEIsU0FBUztRQUNULGtCQUFrQjtRQUVsQixtQkFBbUI7UUFFbkIsNkNBQTZDO1FBRTdDLHNCQUFzQjtRQUN0QixRQUFRO1FBQ1IsTUFBTTtRQUVOLFNBQVM7WUFFTCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7WUFFbkMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRWYsaURBQWlEO1lBRWpELE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBRSxDQUFBO1FBRXpELENBQUM7S0FFSjtDQUdKLENBQUMsQ0FBQTtBQUVGLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNlbnNlbkp1dHN1IGZyb20gXCIuL2luZGV4XCI7XG5cblxuY29uc3Qgdm0gPSBuZXcgU2Vuc2VuSnV0c3Uoe1xuXG4gICAgZWxlbWVudDogJyNhcHAnLFxuXG4gICAgdHJhbnNhY3Rpb25zOntcblxuICAgICAgICB0aXRsZTogJ0hlbGxvIGxlcyBnZW5zJyxcblxuICAgICAgICBtZXNzYWdlOiAnTG9yZW0gaXBzdW0ge3sgY291bnRlciB9fScsXG5cbiAgICAgICAgcm91dGU6ICdjb21pbmdzb29uJyxcblxuICAgICAgICBjb3VudGVyOiAwLFxuXG4gICAgICAgIHBlcnNvbnM6IFtcbiAgICAgICAgICAgICdZYW5uJyxcbiAgICAgICAgICAgICdDaHJpc3RpbmEnLFxuICAgICAgICAgICAgJ015YW5hJyxcbiAgICAgICAgICAgICdTeWFuYSdcbiAgICAgICAgXSxcbiAgICAgICAgXG5cbiAgICAgICAgLy8gcGVyc29uczogbmV3IFByb3h5PHN0cmluZ1tdPihbXG4gICAgICAgIC8vICAgICAnWWFubicsXG4gICAgICAgIC8vICAgICAnQ2hyaXN0aW5hJyxcbiAgICAgICAgLy8gICAgICdNeWFuYScsXG4gICAgICAgIC8vICAgICAnU3lhbmEnXG4gICAgICAgIC8vIF0sIHtcbiAgICAgICAgLy8gICAgIGdldCh0LHAscil7XG5cbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZygnR0VUIFNUQVRFJywgdCwgcCwgcilcblxuICAgICAgICAvLyAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0W3BdXG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc2V0KHQscCxyKXtcblxuICAgICAgICAvLyAgICAgICAgIHRbcF0gPSByXG5cbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLndhcm4oJ1NFVCBTVEFURScsIHQsIHAsIHIpXG5cbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9KSxcbiAgICAgICAgXG4gICAgICAgIGluY3JlbWVudCgpIDogdm9pZHtcblxuICAgICAgICAgICAgdGhpcy5wZXJzb25zWzFdID0gKCdJYW5DYXJ0ZXIgTm93JylcblxuICAgICAgICAgICAgdGhpcy5jb3VudGVyKys7XG5cbiAgICAgICAgICAgIC8vIHRoaXMubWVzc2FnZSA9IGBXZSBjb3VudCB0byAkeyB0aGlzLmNvdW50ZXIgfWBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0luY3JlbWVudCcsIHRoaXMuY291bnRlciwgdGhpcy5wZXJzb25zIClcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH0sXG5cblxufSlcblxuY29uc29sZS53YXJuKCdWTScsIHZtKSJdfQ==

/***/ }),

/***/ "./node_modules/ejs/lib/ejs.js":
/*!*************************************!*\
  !*** ./node_modules/ejs/lib/ejs.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*
 * EJS Embedded JavaScript templates
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/



/**
 * @file Embedded JavaScript templating engine. {@link http://ejs.co}
 * @author Matthew Eernisse <mde@fleegix.org>
 * @author Tiancheng "Timothy" Gu <timothygu99@gmail.com>
 * @project EJS
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0}
 */

/**
 * EJS internal functions.
 *
 * Technically this "module" lies in the same file as {@link module:ejs}, for
 * the sake of organization all the private functions re grouped into this
 * module.
 *
 * @module ejs-internal
 * @private
 */

/**
 * Embedded JavaScript templating engine.
 *
 * @module ejs
 * @public
 */

var fs = __webpack_require__(/*! fs */ "?a259");
var path = __webpack_require__(/*! path */ "?a5fc");
var utils = __webpack_require__(/*! ./utils */ "./node_modules/ejs/lib/utils.js");

var scopeOptionWarned = false;
/** @type {string} */
var _VERSION_STRING = (__webpack_require__(/*! ../package.json */ "./node_modules/ejs/package.json").version);
var _DEFAULT_OPEN_DELIMITER = '<';
var _DEFAULT_CLOSE_DELIMITER = '>';
var _DEFAULT_DELIMITER = '%';
var _DEFAULT_LOCALS_NAME = 'locals';
var _NAME = 'ejs';
var _REGEX_STRING = '(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)';
var _OPTS_PASSABLE_WITH_DATA = ['delimiter', 'scope', 'context', 'debug', 'compileDebug',
  'client', '_with', 'rmWhitespace', 'strict', 'filename', 'async'];
// We don't allow 'cache' option to be passed in the data obj for
// the normal `render` call, but this is where Express 2 & 3 put it
// so we make an exception for `renderFile`
var _OPTS_PASSABLE_WITH_DATA_EXPRESS = _OPTS_PASSABLE_WITH_DATA.concat('cache');
var _BOM = /^\uFEFF/;

/**
 * EJS template function cache. This can be a LRU object from lru-cache NPM
 * module. By default, it is {@link module:utils.cache}, a simple in-process
 * cache that grows continuously.
 *
 * @type {Cache}
 */

exports.cache = utils.cache;

/**
 * Custom file loader. Useful for template preprocessing or restricting access
 * to a certain part of the filesystem.
 *
 * @type {fileLoader}
 */

exports.fileLoader = fs.readFileSync;

/**
 * Name of the object containing the locals.
 *
 * This variable is overridden by {@link Options}`.localsName` if it is not
 * `undefined`.
 *
 * @type {String}
 * @public
 */

exports.localsName = _DEFAULT_LOCALS_NAME;

/**
 * Promise implementation -- defaults to the native implementation if available
 * This is mostly just for testability
 *
 * @type {PromiseConstructorLike}
 * @public
 */

exports.promiseImpl = (new Function('return this;'))().Promise;

/**
 * Get the path to the included file from the parent file path and the
 * specified path.
 *
 * @param {String}  name     specified path
 * @param {String}  filename parent file path
 * @param {Boolean} [isDir=false] whether the parent file path is a directory
 * @return {String}
 */
exports.resolveInclude = function(name, filename, isDir) {
  var dirname = path.dirname;
  var extname = path.extname;
  var resolve = path.resolve;
  var includePath = resolve(isDir ? filename : dirname(filename), name);
  var ext = extname(name);
  if (!ext) {
    includePath += '.ejs';
  }
  return includePath;
};

/**
 * Try to resolve file path on multiple directories
 *
 * @param  {String}        name  specified path
 * @param  {Array<String>} paths list of possible parent directory paths
 * @return {String}
 */
function resolvePaths(name, paths) {
  var filePath;
  if (paths.some(function (v) {
    filePath = exports.resolveInclude(name, v, true);
    return fs.existsSync(filePath);
  })) {
    return filePath;
  }
}

/**
 * Get the path to the included file by Options
 *
 * @param  {String}  path    specified path
 * @param  {Options} options compilation options
 * @return {String}
 */
function getIncludePath(path, options) {
  var includePath;
  var filePath;
  var views = options.views;
  var match = /^[A-Za-z]+:\\|^\//.exec(path);

  // Abs path
  if (match && match.length) {
    path = path.replace(/^\/*/, '');
    if (Array.isArray(options.root)) {
      includePath = resolvePaths(path, options.root);
    } else {
      includePath = exports.resolveInclude(path, options.root || '/', true);
    }
  }
  // Relative paths
  else {
    // Look relative to a passed filename first
    if (options.filename) {
      filePath = exports.resolveInclude(path, options.filename);
      if (fs.existsSync(filePath)) {
        includePath = filePath;
      }
    }
    // Then look in any views directories
    if (!includePath && Array.isArray(views)) {
      includePath = resolvePaths(path, views);
    }
    if (!includePath && typeof options.includer !== 'function') {
      throw new Error('Could not find the include file "' +
          options.escapeFunction(path) + '"');
    }
  }
  return includePath;
}

/**
 * Get the template from a string or a file, either compiled on-the-fly or
 * read from cache (if enabled), and cache the template if needed.
 *
 * If `template` is not set, the file specified in `options.filename` will be
 * read.
 *
 * If `options.cache` is true, this function reads the file from
 * `options.filename` so it must be set prior to calling this function.
 *
 * @memberof module:ejs-internal
 * @param {Options} options   compilation options
 * @param {String} [template] template source
 * @return {(TemplateFunction|ClientFunction)}
 * Depending on the value of `options.client`, either type might be returned.
 * @static
 */

function handleCache(options, template) {
  var func;
  var filename = options.filename;
  var hasTemplate = arguments.length > 1;

  if (options.cache) {
    if (!filename) {
      throw new Error('cache option requires a filename');
    }
    func = exports.cache.get(filename);
    if (func) {
      return func;
    }
    if (!hasTemplate) {
      template = fileLoader(filename).toString().replace(_BOM, '');
    }
  }
  else if (!hasTemplate) {
    // istanbul ignore if: should not happen at all
    if (!filename) {
      throw new Error('Internal EJS error: no file name or template '
                    + 'provided');
    }
    template = fileLoader(filename).toString().replace(_BOM, '');
  }
  func = exports.compile(template, options);
  if (options.cache) {
    exports.cache.set(filename, func);
  }
  return func;
}

/**
 * Try calling handleCache with the given options and data and call the
 * callback with the result. If an error occurs, call the callback with
 * the error. Used by renderFile().
 *
 * @memberof module:ejs-internal
 * @param {Options} options    compilation options
 * @param {Object} data        template data
 * @param {RenderFileCallback} cb callback
 * @static
 */

function tryHandleCache(options, data, cb) {
  var result;
  if (!cb) {
    if (typeof exports.promiseImpl == 'function') {
      return new exports.promiseImpl(function (resolve, reject) {
        try {
          result = handleCache(options)(data);
          resolve(result);
        }
        catch (err) {
          reject(err);
        }
      });
    }
    else {
      throw new Error('Please provide a callback function');
    }
  }
  else {
    try {
      result = handleCache(options)(data);
    }
    catch (err) {
      return cb(err);
    }

    cb(null, result);
  }
}

/**
 * fileLoader is independent
 *
 * @param {String} filePath ejs file path.
 * @return {String} The contents of the specified file.
 * @static
 */

function fileLoader(filePath){
  return exports.fileLoader(filePath);
}

/**
 * Get the template function.
 *
 * If `options.cache` is `true`, then the template is cached.
 *
 * @memberof module:ejs-internal
 * @param {String}  path    path for the specified file
 * @param {Options} options compilation options
 * @return {(TemplateFunction|ClientFunction)}
 * Depending on the value of `options.client`, either type might be returned
 * @static
 */

function includeFile(path, options) {
  var opts = utils.shallowCopy({}, options);
  opts.filename = getIncludePath(path, opts);
  if (typeof options.includer === 'function') {
    var includerResult = options.includer(path, opts.filename);
    if (includerResult) {
      if (includerResult.filename) {
        opts.filename = includerResult.filename;
      }
      if (includerResult.template) {
        return handleCache(opts, includerResult.template);
      }
    }
  }
  return handleCache(opts);
}

/**
 * Re-throw the given `err` in context to the `str` of ejs, `filename`, and
 * `lineno`.
 *
 * @implements {RethrowCallback}
 * @memberof module:ejs-internal
 * @param {Error}  err      Error object
 * @param {String} str      EJS source
 * @param {String} flnm     file name of the EJS file
 * @param {Number} lineno   line number of the error
 * @param {EscapeCallback} esc
 * @static
 */

function rethrow(err, str, flnm, lineno, esc) {
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm);
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
}

function stripSemi(str){
  return str.replace(/;(\s*$)/, '$1');
}

/**
 * Compile the given `str` of ejs into a template function.
 *
 * @param {String}  template EJS template
 *
 * @param {Options} [opts] compilation options
 *
 * @return {(TemplateFunction|ClientFunction)}
 * Depending on the value of `opts.client`, either type might be returned.
 * Note that the return type of the function also depends on the value of `opts.async`.
 * @public
 */

exports.compile = function compile(template, opts) {
  var templ;

  // v1 compat
  // 'scope' is 'context'
  // FIXME: Remove this in a future version
  if (opts && opts.scope) {
    if (!scopeOptionWarned){
      console.warn('`scope` option is deprecated and will be removed in EJS 3');
      scopeOptionWarned = true;
    }
    if (!opts.context) {
      opts.context = opts.scope;
    }
    delete opts.scope;
  }
  templ = new Template(template, opts);
  return templ.compile();
};

/**
 * Render the given `template` of ejs.
 *
 * If you would like to include options but not data, you need to explicitly
 * call this function with `data` being an empty object or `null`.
 *
 * @param {String}   template EJS template
 * @param {Object}  [data={}] template data
 * @param {Options} [opts={}] compilation and rendering options
 * @return {(String|Promise<String>)}
 * Return value type depends on `opts.async`.
 * @public
 */

exports.render = function (template, d, o) {
  var data = d || {};
  var opts = o || {};

  // No options object -- if there are optiony names
  // in the data, copy them to options
  if (arguments.length == 2) {
    utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA);
  }

  return handleCache(opts, template)(data);
};

/**
 * Render an EJS file at the given `path` and callback `cb(err, str)`.
 *
 * If you would like to include options but not data, you need to explicitly
 * call this function with `data` being an empty object or `null`.
 *
 * @param {String}             path     path to the EJS file
 * @param {Object}            [data={}] template data
 * @param {Options}           [opts={}] compilation and rendering options
 * @param {RenderFileCallback} cb callback
 * @public
 */

exports.renderFile = function () {
  var args = Array.prototype.slice.call(arguments);
  var filename = args.shift();
  var cb;
  var opts = {filename: filename};
  var data;
  var viewOpts;

  // Do we have a callback?
  if (typeof arguments[arguments.length - 1] == 'function') {
    cb = args.pop();
  }
  // Do we have data/opts?
  if (args.length) {
    // Should always have data obj
    data = args.shift();
    // Normal passed opts (data obj + opts obj)
    if (args.length) {
      // Use shallowCopy so we don't pollute passed in opts obj with new vals
      utils.shallowCopy(opts, args.pop());
    }
    // Special casing for Express (settings + opts-in-data)
    else {
      // Express 3 and 4
      if (data.settings) {
        // Pull a few things from known locations
        if (data.settings.views) {
          opts.views = data.settings.views;
        }
        if (data.settings['view cache']) {
          opts.cache = true;
        }
        // Undocumented after Express 2, but still usable, esp. for
        // items that are unsafe to be passed along with data, like `root`
        viewOpts = data.settings['view options'];
        if (viewOpts) {
          utils.shallowCopy(opts, viewOpts);
        }
      }
      // Express 2 and lower, values set in app.locals, or people who just
      // want to pass options in their data. NOTE: These values will override
      // anything previously set in settings  or settings['view options']
      utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA_EXPRESS);
    }
    opts.filename = filename;
  }
  else {
    data = {};
  }

  return tryHandleCache(opts, data, cb);
};

/**
 * Clear intermediate JavaScript cache. Calls {@link Cache#reset}.
 * @public
 */

/**
 * EJS template class
 * @public
 */
exports.Template = Template;

exports.clearCache = function () {
  exports.cache.reset();
};

function Template(text, opts) {
  opts = opts || {};
  var options = {};
  this.templateText = text;
  /** @type {string | null} */
  this.mode = null;
  this.truncate = false;
  this.currentLine = 1;
  this.source = '';
  options.client = opts.client || false;
  options.escapeFunction = opts.escape || opts.escapeFunction || utils.escapeXML;
  options.compileDebug = opts.compileDebug !== false;
  options.debug = !!opts.debug;
  options.filename = opts.filename;
  options.openDelimiter = opts.openDelimiter || exports.openDelimiter || _DEFAULT_OPEN_DELIMITER;
  options.closeDelimiter = opts.closeDelimiter || exports.closeDelimiter || _DEFAULT_CLOSE_DELIMITER;
  options.delimiter = opts.delimiter || exports.delimiter || _DEFAULT_DELIMITER;
  options.strict = opts.strict || false;
  options.context = opts.context;
  options.cache = opts.cache || false;
  options.rmWhitespace = opts.rmWhitespace;
  options.root = opts.root;
  options.includer = opts.includer;
  options.outputFunctionName = opts.outputFunctionName;
  options.localsName = opts.localsName || exports.localsName || _DEFAULT_LOCALS_NAME;
  options.views = opts.views;
  options.async = opts.async;
  options.destructuredLocals = opts.destructuredLocals;
  options.legacyInclude = typeof opts.legacyInclude != 'undefined' ? !!opts.legacyInclude : true;

  if (options.strict) {
    options._with = false;
  }
  else {
    options._with = typeof opts._with != 'undefined' ? opts._with : true;
  }

  this.opts = options;

  this.regex = this.createRegex();
}

Template.modes = {
  EVAL: 'eval',
  ESCAPED: 'escaped',
  RAW: 'raw',
  COMMENT: 'comment',
  LITERAL: 'literal'
};

Template.prototype = {
  createRegex: function () {
    var str = _REGEX_STRING;
    var delim = utils.escapeRegExpChars(this.opts.delimiter);
    var open = utils.escapeRegExpChars(this.opts.openDelimiter);
    var close = utils.escapeRegExpChars(this.opts.closeDelimiter);
    str = str.replace(/%/g, delim)
      .replace(/</g, open)
      .replace(/>/g, close);
    return new RegExp(str);
  },

  compile: function () {
    /** @type {string} */
    var src;
    /** @type {ClientFunction} */
    var fn;
    var opts = this.opts;
    var prepended = '';
    var appended = '';
    /** @type {EscapeCallback} */
    var escapeFn = opts.escapeFunction;
    /** @type {FunctionConstructor} */
    var ctor;
    /** @type {string} */
    var sanitizedFilename = opts.filename ? JSON.stringify(opts.filename) : 'undefined';

    if (!this.source) {
      this.generateSource();
      prepended +=
        '  var __output = "";\n' +
        '  function __append(s) { if (s !== undefined && s !== null) __output += s }\n';
      if (opts.outputFunctionName) {
        prepended += '  var ' + opts.outputFunctionName + ' = __append;' + '\n';
      }
      if (opts.destructuredLocals && opts.destructuredLocals.length) {
        var destructuring = '  var __locals = (' + opts.localsName + ' || {}),\n';
        for (var i = 0; i < opts.destructuredLocals.length; i++) {
          var name = opts.destructuredLocals[i];
          if (i > 0) {
            destructuring += ',\n  ';
          }
          destructuring += name + ' = __locals.' + name;
        }
        prepended += destructuring + ';\n';
      }
      if (opts._with !== false) {
        prepended +=  '  with (' + opts.localsName + ' || {}) {' + '\n';
        appended += '  }' + '\n';
      }
      appended += '  return __output;' + '\n';
      this.source = prepended + this.source + appended;
    }

    if (opts.compileDebug) {
      src = 'var __line = 1' + '\n'
        + '  , __lines = ' + JSON.stringify(this.templateText) + '\n'
        + '  , __filename = ' + sanitizedFilename + ';' + '\n'
        + 'try {' + '\n'
        + this.source
        + '} catch (e) {' + '\n'
        + '  rethrow(e, __lines, __filename, __line, escapeFn);' + '\n'
        + '}' + '\n';
    }
    else {
      src = this.source;
    }

    if (opts.client) {
      src = 'escapeFn = escapeFn || ' + escapeFn.toString() + ';' + '\n' + src;
      if (opts.compileDebug) {
        src = 'rethrow = rethrow || ' + rethrow.toString() + ';' + '\n' + src;
      }
    }

    if (opts.strict) {
      src = '"use strict";\n' + src;
    }
    if (opts.debug) {
      console.log(src);
    }
    if (opts.compileDebug && opts.filename) {
      src = src + '\n'
        + '//# sourceURL=' + sanitizedFilename + '\n';
    }

    try {
      if (opts.async) {
        // Have to use generated function for this, since in envs without support,
        // it breaks in parsing
        try {
          ctor = (new Function('return (async function(){}).constructor;'))();
        }
        catch(e) {
          if (e instanceof SyntaxError) {
            throw new Error('This environment does not support async/await');
          }
          else {
            throw e;
          }
        }
      }
      else {
        ctor = Function;
      }
      fn = new ctor(opts.localsName + ', escapeFn, include, rethrow', src);
    }
    catch(e) {
      // istanbul ignore else
      if (e instanceof SyntaxError) {
        if (opts.filename) {
          e.message += ' in ' + opts.filename;
        }
        e.message += ' while compiling ejs\n\n';
        e.message += 'If the above error is not helpful, you may want to try EJS-Lint:\n';
        e.message += 'https://github.com/RyanZim/EJS-Lint';
        if (!opts.async) {
          e.message += '\n';
          e.message += 'Or, if you meant to create an async function, pass `async: true` as an option.';
        }
      }
      throw e;
    }

    // Return a callable function which will execute the function
    // created by the source-code, with the passed data as locals
    // Adds a local `include` function which allows full recursive include
    var returnedFn = opts.client ? fn : function anonymous(data) {
      var include = function (path, includeData) {
        var d = utils.shallowCopy({}, data);
        if (includeData) {
          d = utils.shallowCopy(d, includeData);
        }
        return includeFile(path, opts)(d);
      };
      return fn.apply(opts.context, [data || {}, escapeFn, include, rethrow]);
    };
    if (opts.filename && typeof Object.defineProperty === 'function') {
      var filename = opts.filename;
      var basename = path.basename(filename, path.extname(filename));
      try {
        Object.defineProperty(returnedFn, 'name', {
          value: basename,
          writable: false,
          enumerable: false,
          configurable: true
        });
      } catch (e) {/* ignore */}
    }
    return returnedFn;
  },

  generateSource: function () {
    var opts = this.opts;

    if (opts.rmWhitespace) {
      // Have to use two separate replace here as `^` and `$` operators don't
      // work well with `\r` and empty lines don't work well with the `m` flag.
      this.templateText =
        this.templateText.replace(/[\r\n]+/g, '\n').replace(/^\s+|\s+$/gm, '');
    }

    // Slurp spaces and tabs before <%_ and after _%>
    this.templateText =
      this.templateText.replace(/[ \t]*<%_/gm, '<%_').replace(/_%>[ \t]*/gm, '_%>');

    var self = this;
    var matches = this.parseTemplateText();
    var d = this.opts.delimiter;
    var o = this.opts.openDelimiter;
    var c = this.opts.closeDelimiter;

    if (matches && matches.length) {
      matches.forEach(function (line, index) {
        var closing;
        // If this is an opening tag, check for closing tags
        // FIXME: May end up with some false positives here
        // Better to store modes as k/v with openDelimiter + delimiter as key
        // Then this can simply check against the map
        if ( line.indexOf(o + d) === 0        // If it is a tag
          && line.indexOf(o + d + d) !== 0) { // and is not escaped
          closing = matches[index + 2];
          if (!(closing == d + c || closing == '-' + d + c || closing == '_' + d + c)) {
            throw new Error('Could not find matching close tag for "' + line + '".');
          }
        }
        self.scanLine(line);
      });
    }

  },

  parseTemplateText: function () {
    var str = this.templateText;
    var pat = this.regex;
    var result = pat.exec(str);
    var arr = [];
    var firstPos;

    while (result) {
      firstPos = result.index;

      if (firstPos !== 0) {
        arr.push(str.substring(0, firstPos));
        str = str.slice(firstPos);
      }

      arr.push(result[0]);
      str = str.slice(result[0].length);
      result = pat.exec(str);
    }

    if (str) {
      arr.push(str);
    }

    return arr;
  },

  _addOutput: function (line) {
    if (this.truncate) {
      // Only replace single leading linebreak in the line after
      // -%> tag -- this is the single, trailing linebreak
      // after the tag that the truncation mode replaces
      // Handle Win / Unix / old Mac linebreaks -- do the \r\n
      // combo first in the regex-or
      line = line.replace(/^(?:\r\n|\r|\n)/, '');
      this.truncate = false;
    }
    if (!line) {
      return line;
    }

    // Preserve literal slashes
    line = line.replace(/\\/g, '\\\\');

    // Convert linebreaks
    line = line.replace(/\n/g, '\\n');
    line = line.replace(/\r/g, '\\r');

    // Escape double-quotes
    // - this will be the delimiter during execution
    line = line.replace(/"/g, '\\"');
    this.source += '    ; __append("' + line + '")' + '\n';
  },

  scanLine: function (line) {
    var self = this;
    var d = this.opts.delimiter;
    var o = this.opts.openDelimiter;
    var c = this.opts.closeDelimiter;
    var newLineCount = 0;

    newLineCount = (line.split('\n').length - 1);

    switch (line) {
    case o + d:
    case o + d + '_':
      this.mode = Template.modes.EVAL;
      break;
    case o + d + '=':
      this.mode = Template.modes.ESCAPED;
      break;
    case o + d + '-':
      this.mode = Template.modes.RAW;
      break;
    case o + d + '#':
      this.mode = Template.modes.COMMENT;
      break;
    case o + d + d:
      this.mode = Template.modes.LITERAL;
      this.source += '    ; __append("' + line.replace(o + d + d, o + d) + '")' + '\n';
      break;
    case d + d + c:
      this.mode = Template.modes.LITERAL;
      this.source += '    ; __append("' + line.replace(d + d + c, d + c) + '")' + '\n';
      break;
    case d + c:
    case '-' + d + c:
    case '_' + d + c:
      if (this.mode == Template.modes.LITERAL) {
        this._addOutput(line);
      }

      this.mode = null;
      this.truncate = line.indexOf('-') === 0 || line.indexOf('_') === 0;
      break;
    default:
      // In script mode, depends on type of tag
      if (this.mode) {
        // If '//' is found without a line break, add a line break.
        switch (this.mode) {
        case Template.modes.EVAL:
        case Template.modes.ESCAPED:
        case Template.modes.RAW:
          if (line.lastIndexOf('//') > line.lastIndexOf('\n')) {
            line += '\n';
          }
        }
        switch (this.mode) {
        // Just executing code
        case Template.modes.EVAL:
          this.source += '    ; ' + line + '\n';
          break;
          // Exec, esc, and output
        case Template.modes.ESCAPED:
          this.source += '    ; __append(escapeFn(' + stripSemi(line) + '))' + '\n';
          break;
          // Exec and output
        case Template.modes.RAW:
          this.source += '    ; __append(' + stripSemi(line) + ')' + '\n';
          break;
        case Template.modes.COMMENT:
          // Do nothing
          break;
          // Literal <%% mode, append as raw output
        case Template.modes.LITERAL:
          this._addOutput(line);
          break;
        }
      }
      // In string mode, just add the output
      else {
        this._addOutput(line);
      }
    }

    if (self.opts.compileDebug && newLineCount) {
      this.currentLine += newLineCount;
      this.source += '    ; __line = ' + this.currentLine + '\n';
    }
  }
};

/**
 * Escape characters reserved in XML.
 *
 * This is simply an export of {@link module:utils.escapeXML}.
 *
 * If `markup` is `undefined` or `null`, the empty string is returned.
 *
 * @param {String} markup Input string
 * @return {String} Escaped string
 * @public
 * @func
 * */
exports.escapeXML = utils.escapeXML;

/**
 * Express.js support.
 *
 * This is an alias for {@link module:ejs.renderFile}, in order to support
 * Express.js out-of-the-box.
 *
 * @func
 */

exports.__express = exports.renderFile;

/**
 * Version of EJS.
 *
 * @readonly
 * @type {String}
 * @public
 */

exports.VERSION = _VERSION_STRING;

/**
 * Name for detection of EJS.
 *
 * @readonly
 * @type {String}
 * @public
 */

exports.name = _NAME;

/* istanbul ignore if */
if (typeof window != 'undefined') {
  window.ejs = exports;
}


/***/ }),

/***/ "./node_modules/ejs/lib/utils.js":
/*!***************************************!*\
  !*** ./node_modules/ejs/lib/utils.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/*
 * EJS Embedded JavaScript templates
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/

/**
 * Private utility functions
 * @module utils
 * @private
 */



var regExpChars = /[|\\{}()[\]^$+*?.]/g;

/**
 * Escape characters reserved in regular expressions.
 *
 * If `string` is `undefined` or `null`, the empty string is returned.
 *
 * @param {String} string Input string
 * @return {String} Escaped string
 * @static
 * @private
 */
exports.escapeRegExpChars = function (string) {
  // istanbul ignore if
  if (!string) {
    return '';
  }
  return String(string).replace(regExpChars, '\\$&');
};

var _ENCODE_HTML_RULES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&#34;',
  "'": '&#39;'
};
var _MATCH_HTML = /[&<>'"]/g;

function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
}

/**
 * Stringified version of constants used by {@link module:utils.escapeXML}.
 *
 * It is used in the process of generating {@link ClientFunction}s.
 *
 * @readonly
 * @type {String}
 */

var escapeFuncStr =
  'var _ENCODE_HTML_RULES = {\n'
+ '      "&": "&amp;"\n'
+ '    , "<": "&lt;"\n'
+ '    , ">": "&gt;"\n'
+ '    , \'"\': "&#34;"\n'
+ '    , "\'": "&#39;"\n'
+ '    }\n'
+ '  , _MATCH_HTML = /[&<>\'"]/g;\n'
+ 'function encode_char(c) {\n'
+ '  return _ENCODE_HTML_RULES[c] || c;\n'
+ '};\n';

/**
 * Escape characters reserved in XML.
 *
 * If `markup` is `undefined` or `null`, the empty string is returned.
 *
 * @implements {EscapeCallback}
 * @param {String} markup Input string
 * @return {String} Escaped string
 * @static
 * @private
 */

exports.escapeXML = function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
exports.escapeXML.toString = function () {
  return Function.prototype.toString.call(this) + ';\n' + escapeFuncStr;
};

/**
 * Naive copy of properties from one object to another.
 * Does not recurse into non-scalar properties
 * Does not check to see if the property has a value before copying
 *
 * @param  {Object} to   Destination object
 * @param  {Object} from Source object
 * @return {Object}      Destination object
 * @static
 * @private
 */
exports.shallowCopy = function (to, from) {
  from = from || {};
  for (var p in from) {
    to[p] = from[p];
  }
  return to;
};

/**
 * Naive copy of a list of key names, from one object to another.
 * Only copies property if it is actually defined
 * Does not recurse into non-scalar properties
 *
 * @param  {Object} to   Destination object
 * @param  {Object} from Source object
 * @param  {Array} list List of properties to copy
 * @return {Object}      Destination object
 * @static
 * @private
 */
exports.shallowCopyFromList = function (to, from, list) {
  for (var i = 0; i < list.length; i++) {
    var p = list[i];
    if (typeof from[p] != 'undefined') {
      to[p] = from[p];
    }
  }
  return to;
};

/**
 * Simple in-process cache implementation. Does not implement limits of any
 * sort.
 *
 * @implements {Cache}
 * @static
 * @private
 */
exports.cache = {
  _data: {},
  set: function (key, val) {
    this._data[key] = val;
  },
  get: function (key) {
    return this._data[key];
  },
  remove: function (key) {
    delete this._data[key];
  },
  reset: function () {
    this._data = {};
  }
};

/**
 * Transforms hyphen case variable into camel case.
 *
 * @param {String} string Hyphen case string
 * @return {String} Camel case string
 * @static
 * @private
 */
exports.hyphenToCamel = function (str) {
  return str.replace(/-[a-z]/g, function (match) { return match[1].toUpperCase(); });
};


/***/ }),

/***/ "?a259":
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?a5fc":
/*!**********************!*\
  !*** path (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "./node_modules/ejs/package.json":
/*!***************************************!*\
  !*** ./node_modules/ejs/package.json ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"ejs","description":"Embedded JavaScript templates","keywords":["template","engine","ejs"],"version":"3.1.6","author":"Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)","license":"Apache-2.0","bin":{"ejs":"./bin/cli.js"},"main":"./lib/ejs.js","jsdelivr":"ejs.min.js","unpkg":"ejs.min.js","repository":{"type":"git","url":"git://github.com/mde/ejs.git"},"bugs":"https://github.com/mde/ejs/issues","homepage":"https://github.com/mde/ejs","dependencies":{"jake":"^10.6.1"},"devDependencies":{"browserify":"^16.5.1","eslint":"^6.8.0","git-directory-deploy":"^1.5.1","jsdoc":"^3.6.4","lru-cache":"^4.0.1","mocha":"^7.1.1","uglify-js":"^3.3.16"},"engines":{"node":">=0.10.0"},"scripts":{"test":"mocha"}}');

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./lib/test.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFFBQVE7QUFDcEIsWUFBWSxRQUFRO0FBQ3BCLFlBQVksT0FBTztBQUNuQixZQUFZLGFBQWE7QUFDekI7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFdBQVc7QUFDWDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixtREFBbUQsZ0NBQWdDO0FBQ25GOzs7Ozs7Ozs7OztBQ2xMQTs7Ozs7Ozs7OztBQ0FBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2Vuc2VuLWp1dHN1Ly4vbGliL2luZGV4LmpzIiwid2VicGFjazovL3NlbnNlbi1qdXRzdS8uL2xpYi90ZXN0LmpzIiwid2VicGFjazovL3NlbnNlbi1qdXRzdS8uL25vZGVfbW9kdWxlcy9lanMvbGliL2Vqcy5qcyIsIndlYnBhY2s6Ly9zZW5zZW4tanV0c3UvLi9ub2RlX21vZHVsZXMvZWpzL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly9zZW5zZW4tanV0c3UvaWdub3JlZHwvVXNlcnMvaWFuY2FydGVyL1dvcmtzL2RldmVsb3BtZW50cy9naXQvbnBtL3NlbnNlbi1qdXRzdS9ub2RlX21vZHVsZXMvZWpzL2xpYnxmcyIsIndlYnBhY2s6Ly9zZW5zZW4tanV0c3UvaWdub3JlZHwvVXNlcnMvaWFuY2FydGVyL1dvcmtzL2RldmVsb3BtZW50cy9naXQvbnBtL3NlbnNlbi1qdXRzdS9ub2RlX21vZHVsZXMvZWpzL2xpYnxwYXRoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlciB9IGZyb20gJ2Vqcyc7XG5jb25zdCBTeW50YXhWYXJpYWJsZXNSZWdFeHAgPSBuZXcgUmVnRXhwKCd7eyguKj8pfX0nLCAnZycpO1xuY29uc3QgU3ludGF4TmF0aXZlUmVnRXhwID0gbmV3IFJlZ0V4cCgneyUoLio/KSV9JywgJ2cnKTtcbmNvbnN0IFN5RGV0ciA9ICclc24nO1xuLyoqXG4gKiBFbGVtZW50IEF0dHJpYnV0ZXMgT2JzZXJ2ZXJcbiAqL1xuZnVuY3Rpb24gJERPTUF0dHJpYnV0ZXNPYnNlcnZlcihodG1sLCBjYWxsYmFjaykge1xuICAgIGlmIChodG1sLmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlcyA9IE9iamVjdC52YWx1ZXMoaHRtbC5hdHRyaWJ1dGVzKTtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzLm1hcChhdHRyaWJ1dGUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoZXMgPSBbLi4uYXR0cmlidXRlLnZhbHVlLm1hdGNoQWxsKFN5bnRheFZhcmlhYmxlc1JlZ0V4cCldO1xuICAgICAgICAgICAgICAgIG1hdGNoZXMubWFwKChtYXRjaCwgaykgPT4geyBtYXRjaGVzW2tdWzFdID0gbWF0Y2hlc1trXVsxXS50cmltKCk7IH0pO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogaHRtbCxcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVOYW1lOiBhdHRyaWJ1dGUubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoZXM6IG1hdGNoZXMsXG4gICAgICAgICAgICAgICAgICAgIG1vY2t1cDogaHRtbC5jbG9uZU5vZGUodHJ1ZSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAkRE9NQXR0cmlidXRlc09ic2VydmVyO1xufVxuLyoqXG4gKiBFbGVtZW50IENvbnRlbnQgT2JzZXJ2ZXJcbiAqL1xuZnVuY3Rpb24gJERPTUNvbnRlbnRPYnNlcnZlcihodG1sLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IG1hdGNoZXMgPSBbLi4uaHRtbC5pbm5lclRleHQubWF0Y2hBbGwoU3ludGF4VmFyaWFibGVzUmVnRXhwKV07XG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoKSB7XG4gICAgICAgIG1hdGNoZXMubWFwKChtYXRjaCwgaykgPT4geyBtYXRjaGVzW2tdWzFdID0gbWF0Y2hlc1trXVsxXS50cmltKCk7IH0pO1xuICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgICBlbGVtZW50OiBodG1sLFxuICAgICAgICAgICAgYXR0cmlidXRlOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRydWUsXG4gICAgICAgICAgICBtYXRjaGVzOiBtYXRjaGVzLFxuICAgICAgICAgICAgbW9ja3VwOiBodG1sLmNsb25lTm9kZSh0cnVlKVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuICRET01Db250ZW50T2JzZXJ2ZXI7XG59XG4vKipcbiAqIEVsZW1lbnQgT2JzZXJ2ZXJcbiAqL1xuZnVuY3Rpb24gJERPTU9ic2VydmVyKGh0bWwsIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBPYmplY3QudmFsdWVzKGh0bWwuY2hpbGRyZW4pO1xuICAgIGlmIChjaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgY2hpbGRyZW4ubWFwKGUgPT4ge1xuICAgICAgICAgICAgJERPTUF0dHJpYnV0ZXNPYnNlcnZlcihlLCBjYWxsYmFjayk7XG4gICAgICAgICAgICAkSlNPYnNlcnZlcihlLCBjYWxsYmFjayk7XG4gICAgICAgICAgICAkRE9NT2JzZXJ2ZXIoZSwgY2FsbGJhY2spO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgICRET01Db250ZW50T2JzZXJ2ZXIoaHRtbCwgY2FsbGJhY2spO1xuICAgIH1cbiAgICByZXR1cm4gJERPTU9ic2VydmVyO1xufVxuLyoqXG4gKiBPYnNlcnZlIEpTIENvZGUgaW4gRWxlbWVudFxuICovXG5mdW5jdGlvbiAkSlNPYnNlcnZlcihodG1sLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IG1hdGNoZXMgPSBbLi4uaHRtbC5pbm5lclRleHQubWF0Y2hBbGwoU3ludGF4TmF0aXZlUmVnRXhwKV07XG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoKSB7XG4gICAgICAgIG1hdGNoZXMubWFwKChtYXRjaCwgaykgPT4geyBtYXRjaGVzW2tdWzFdID0gbWF0Y2hlc1trXVsxXS50cmltKCk7IH0pO1xuICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgICBlbGVtZW50OiBodG1sLFxuICAgICAgICAgICAgaXNOYXRpdmU6IHRydWUsXG4gICAgICAgICAgICBtYXRjaGVzOiBtYXRjaGVzLFxuICAgICAgICAgICAgbW9ja3VwOiBodG1sLmNsb25lTm9kZSh0cnVlKVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuICRET01Db250ZW50T2JzZXJ2ZXI7XG59XG4vKipcbiAqIEZpbmQgVHJhbnNhY3Rpb24gZXhwcmVzc2lvbnMgaW4gSlMgRXhwcmVzc2lvblxuICovXG5mdW5jdGlvbiAkSlNGaW5kVHJhbnNhY3Rpb25zKGh0bWwsIHRyYW5zYWN0aW9ucywgY2FsbGJhY2spIHtcbiAgICBpZiAodHJhbnNhY3Rpb25zKSB7XG4gICAgICAgIGNvbnN0ICR0cmFuc2FjdGlvbnMgPSBPYmplY3QuZW50cmllcyh0cmFuc2FjdGlvbnMpO1xuICAgICAgICBpZiAoJHRyYW5zYWN0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICR0cmFuc2FjdGlvbnMubWFwKGVudHJ5ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRjaGVzID0gWy4uLlN0YWJpbGl6ZUNvbnRlbnQoaHRtbC5pbm5lckhUTUwpLm1hdGNoQWxsKG5ldyBSZWdFeHAoYCR7ZW50cnlbMF19YCwgJ2cnKSldO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLndhcm4oJyRKU0ZpbmRUcmFuc2FjdGlvbnMnLCBlbnRyeSwgbWF0Y2hlcylcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogaHRtbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTmF0aXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXM6IG1hdGNoZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2NrdXA6IGh0bWwuY2xvbmVOb2RlKHRydWUpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAkSlNGaW5kVHJhbnNhY3Rpb25zO1xufVxuLyoqXG4gKiBGcmFnbWVudCByZW5kZXJpbmcgZnJvbSBTdHJpbmdcbiAqL1xuZnVuY3Rpb24gRnJhZ21lbnRSZW5kZXIoaW5wdXQsIGRpY3Rpb25hcnkpIHtcbiAgICByZXR1cm4gcmVuZGVyKGAke2lucHV0fWAsIGRpY3Rpb25hcnksIHtcbiAgICAgICAgZGVsaW1pdGVyOiBgJHtTeURldHJ9YCxcbiAgICAgICAgY2xpZW50OiB0cnVlXG4gICAgfSk7XG59XG4vKipcbiAqIFBhcnNlIE5vZGUgb2YgQ29tcG9uZW50XG4gKi9cbmZ1bmN0aW9uIFBhcnNlTm9kZVN0YXRlKGNvbXBvbmVudCwgbm9kZSkge1xuICAgICRET01PYnNlcnZlcihub2RlLCAocmVjb3JkKSA9PiB7XG4gICAgICAgIGlmIChyZWNvcmQubWF0Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHJlY29yZC5lbGVtZW50LiRjb250ZXh0ID0gY29tcG9uZW50LiRzdGF0ZTtcbiAgICAgICAgICAgIGlmICghcmVjb3JkLmlzTmF0aXZlKSB7XG4gICAgICAgICAgICAgICAgcmVjb3JkLm1hdGNoZXMubWFwKG1hdGNoID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gbWF0Y2hbMV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgaW4gY29tcG9uZW50LiR0cmFuc2FjdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5QdXNoUmVmKGtleSwgcmVjb3JkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5VcGdyYWRlVHJhbnNhY3Rpb24oa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBlbHNle1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ05vdCBzdXBwb3J0ZWQnLCBrZXksIHJlY29yZCwgd2luZG93LlN0YXRpY1NlbnNlbkp1dHN1SW5zdGFuY2VbIGNvbXBvbmVudC4kc3RhdGljS2V5IF0gKVxuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogIFBhcnNlIFJlY29yZGVkXG4gKi9cbmZ1bmN0aW9uIFBhcnNlUmVjb3JkKGNvbXBvbmVudCwgcmVjb3JkLCBtYXRjaCkge1xuICAgIGlmIChyZWNvcmQuY29udGVudCkge1xuICAgICAgICByZWNvcmQuZWxlbWVudC5pbm5lckhUTUwgPSBGcmFnbWVudFJlbmRlcigoKHJlY29yZC5tb2NrdXA/LmlubmVySFRNTCB8fCAnJylcbiAgICAgICAgICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAobWF0Y2hbMF0pLCBgPCR7U3lEZXRyfT0ke21hdGNoWzFdfSR7U3lEZXRyfT5gKSksIGNvbXBvbmVudC4kdHJhbnNhY3Rpb25zIHx8IHt9KTtcbiAgICB9XG4gICAgaWYgKHJlY29yZC5hdHRyaWJ1dGUpIHtcbiAgICAgICAgaWYgKHJlY29yZC5hdHRyaWJ1dGVOYW1lKSB7XG4gICAgICAgICAgICByZWNvcmQuZWxlbWVudC5zZXRBdHRyaWJ1dGUocmVjb3JkLmF0dHJpYnV0ZU5hbWUsIEZyYWdtZW50UmVuZGVyKCgocmVjb3JkLm1vY2t1cD8uZ2V0QXR0cmlidXRlKHJlY29yZC5hdHRyaWJ1dGVOYW1lKSB8fCAnJykucmVwbGFjZShuZXcgUmVnRXhwKG1hdGNoWzBdKSwgYDwke1N5RGV0cn09JHttYXRjaFsxXX0ke1N5RGV0cn0+YCkpLCBjb21wb25lbnQuJHRyYW5zYWN0aW9ucyB8fCB7fSkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBQYXJzZVJlY29yZDtcbn1cbmZ1bmN0aW9uIFN0YWJpbGl6ZUNvbnRlbnQoY29udGVudCkge1xuICAgIHJldHVybiAoY29udGVudCB8fCAnJykucmVwbGFjZSgvJmd0Oy9nLCBgPmApLnJlcGxhY2UoLyZsdDsvZywgYDxgKTtcbn1cbmNsYXNzIFNlbnNlbkp1dHN1IHtcbiAgICAvLyAjJHByb3BzIDogU2Vuc2VuVEp1dHN1UHJvcHM8Vj4gPSB7fSBhcyBTZW5zZW5USnV0c3VQcm9wczxWPlxuICAgIC8qKlxuICAgICAqIE5ldyBDb25zdHJ1Y3RcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICAvLyB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgICAgIHRoaXMuJHN0YXRpY0tleSA9IDA7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSBkb2N1bWVudC5ib2R5O1xuICAgICAgICB0aGlzLiR2aXJ0dWFsaXphdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMuJHRyYW5zYWN0aW9ucyA9IHt9O1xuICAgICAgICB0aGlzLiRzdGF0ZSA9IHt9O1xuICAgICAgICB0aGlzLiRyZWZzID0ge307XG4gICAgICAgIHRoaXMuSW5pdChwcm9wcykuU3RhdGVzKCkuUmVuZGVyKCk7XG4gICAgfVxuICAgIEluaXQocHJvcHMpIHtcbiAgICAgICAgLy8gdGhpcy4jJHByb3BzID0gcHJvcHM7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAocHJvcHMuZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KVxuICAgICAgICAgICAgPyBwcm9wcy5lbGVtZW50XG4gICAgICAgICAgICA6ICh0eXBlb2YgcHJvcHMuZWxlbWVudCA9PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHtwcm9wcy5lbGVtZW50fWApXG4gICAgICAgICAgICAgICAgOiBudWxsKTtcbiAgICAgICAgdGhpcy4kdHJhbnNhY3Rpb25zID0gcHJvcHMudHJhbnNhY3Rpb25zIHx8IHt9O1xuICAgICAgICB0aGlzLiRzdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuJHRyYW5zYWN0aW9ucyk7XG4gICAgICAgIHdpbmRvdy5TdGF0aWNTZW5zZW5KdXRzdUluc3RhbmNlID0gd2luZG93LlN0YXRpY1NlbnNlbkp1dHN1SW5zdGFuY2UgfHwgW107XG4gICAgICAgIHRoaXMuJHN0YXRpY0tleSA9IHdpbmRvdy5TdGF0aWNTZW5zZW5KdXRzdUluc3RhbmNlLmxlbmd0aDtcbiAgICAgICAgd2luZG93LlN0YXRpY1NlbnNlbkp1dHN1SW5zdGFuY2VbdGhpcy4kc3RhdGljS2V5XSA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBVcGdyYWRlVHJhbnNhY3Rpb24oa2V5KSB7XG4gICAgICAgIGlmIChrZXkgaW4gdGhpcy4kcmVmcykge1xuICAgICAgICAgICAgY29uc3QgcmVjb3JkcyA9IHRoaXMuJHJlZnNba2V5XTtcbiAgICAgICAgICAgIHJlY29yZHM/Lm1hcChyZWNvcmQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZWNvcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVjb3JkLm1hdGNoZXMubWFwKG1hdGNoID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVjb3JkLmlzTmF0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUGFyc2VSZWNvcmQodGhpcywgcmVjb3JkLCBtYXRjaCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVjb3JkLmNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tcHV0ZWQgPSBGcmFnbWVudFJlbmRlcihTdGFiaWxpemVDb250ZW50KHJlY29yZC5tb2NrdXA/LmlubmVySFRNTCB8fCAnJyksIHRoaXMuJHRyYW5zYWN0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY29yZC5lbGVtZW50LmlubmVySFRNTCA9IGNvbXB1dGVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkRE9NT2JzZXJ2ZXIocmVjb3JkLmVsZW1lbnQsIChyZWMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWMubWF0Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QudmFsdWVzKHJlYy5tYXRjaGVzKS5tYXAobWF0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5QdXNoUmVmKG1hdFsxXSwgcmVjKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUGFyc2VSZWNvcmQodGhpcywgcmVjLCBtYXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBTdGF0ZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLiRzdGF0ZSkge1xuICAgICAgICAgICAgY29uc3QgJF9zdGF0ZXMgPSBPYmplY3QuZW50cmllcyh0aGlzLiRzdGF0ZSk7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFN0YXRlc1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZiAoJF9zdGF0ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogUHJlLUJ1aWxkIFN0YXRlc1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICRfc3RhdGVzLm1hcChlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlWzFdID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gZVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbmRlciA9IFsuLi5lWzFdLm1hdGNoQWxsKFN5bnRheFZhcmlhYmxlc1JlZ0V4cCldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbmRlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5kZXIubWFwKGZvdW5kID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmRbMV0gPSBmb3VuZFsxXS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHRyYW5zYWN0aW9uc1tuYW1lXSA9IGVbMV0ucmVwbGFjZShuZXcgUmVnRXhwKGAke2ZvdW5kWzBdfWApLCB0aGlzLiRzdGF0ZVtmb3VuZFsxXV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQnVpbGQgU3RhdGVzXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgY29uc3QgJHN0YXRlcyA9IE9iamVjdC5lbnRyaWVzKHRoaXMuJHN0YXRlKTtcbiAgICAgICAgICAgICAgICAkc3RhdGVzLm1hcChlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGVbMF07XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBPYmplY3RzXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVbMV0gPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgICAgICogSXMgQXJyYXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZVsxXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdGF0ZVtuYW1lXSA9IG5ldyBQcm94eShlWzFdLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldCh0YXJnZXQsIHByb3AsIHJlY2VpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0W3Byb3BdID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1NFVCBNT1ZFIFdpdGggRnVuY3Rpb24nLCBwcm9wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldFtwcm9wXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5hcHBseSh0YXJnZXQsIHR5cGVvZiByZWNlaXZlID09ICdvYmplY3QnID8gcmVjZWl2ZSA6IFtyZWNlaXZlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSByZWNlaXZlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kdHJhbnNhY3Rpb25zW25hbWVdID0gdGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5VcGdyYWRlVHJhbnNhY3Rpb24obmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHRyYW5zYWN0aW9uc1tuYW1lXSA9IHRoaXMuJHN0YXRlW25hbWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0YXRlW25hbWVdWzBdID0gKCdUZXN0b24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignU3RhdGUgb2YgT2JqZWN0JywgZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy4kc3RhdGUsIGAke25hbWV9YCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2VsZi4kdHJhbnNhY3Rpb25zW25hbWVdOyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJHRyYW5zYWN0aW9uc1tuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLlVwZ3JhZGVUcmFuc2FjdGlvbihuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgUHVzaFJlZihrZXksIHJlY29yZCkge1xuICAgICAgICB0aGlzLiRyZWZzW2tleV0gPSB0aGlzLiRyZWZzW2tleV0gfHwgW107XG4gICAgICAgIHRoaXMuJHJlZnNba2V5XT8ucHVzaChyZWNvcmQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgUmVuZGVyKCkge1xuICAgICAgICBpZiAodGhpcy4kZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLiR2aXJ0dWFsaXphdGlvbiA9IChuZXcgRE9NUGFyc2VyKCkpLnBhcnNlRnJvbVN0cmluZyh0aGlzLiRlbGVtZW50LmlubmVySFRNTCwgJ3RleHQvaHRtbCcpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBUcmFpdGVtZW50IGRlcyBleHByZXNzaW9ucyBOYXRpdmVcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgJERPTU9ic2VydmVyKHRoaXMuJHZpcnR1YWxpemF0aW9uLmJvZHksIChyZWNvcmQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVjb3JkLm1hdGNoZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgcmVjb3JkLmVsZW1lbnQuJGNvbnRleHQgPSB0aGlzLiRzdGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlY29yZC5pc05hdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlY29yZC5tYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjb3JkLm1hdGNoZXMubWFwKG1hdGNoID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjb3JkLmVsZW1lbnQuaW5uZXJIVE1MID0gKFN0YWJpbGl6ZUNvbnRlbnQocmVjb3JkLmVsZW1lbnQuaW5uZXJIVE1MIHx8ICcnKS5yZXBsYWNlKG1hdGNoWzBdLCBgPCR7U3lEZXRyfSR7bWF0Y2hbMV19JHtTeURldHJ9PmApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkSlNGaW5kVHJhbnNhY3Rpb25zKHJlY29yZC5lbGVtZW50LCB0aGlzLiR0cmFuc2FjdGlvbnMsIChyZWMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlYy5pc05hdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlYy5tYXRjaGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYy5tYXRjaGVzLm1hcChtYXQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlB1c2hSZWYobWF0WzBdLCByZWMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjb3JkLmVsZW1lbnQuaW5uZXJIVE1MID0gYCR7RnJhZ21lbnRSZW5kZXIoU3RhYmlsaXplQ29udGVudChyZWNvcmQuZWxlbWVudC5pbm5lckhUTUwgfHwgJycpLCB0aGlzLiR0cmFuc2FjdGlvbnMpfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBkZXRlY3RlZCcsIGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBUcmFpdGVtZW50IGRlcyB0cmFuc2FjdGlvbnNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgUGFyc2VOb2RlU3RhdGUodGhpcywgdGhpcy4kdmlydHVhbGl6YXRpb24uYm9keSk7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIE1pc2Ugw6Agam91clxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBPYmplY3QudmFsdWVzKHRoaXMuJHZpcnR1YWxpemF0aW9uLmJvZHkuY2hpbGRyZW4pO1xuICAgICAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNoaWxkcmVuLm1hcChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQ/LmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBTZW5zZW5KdXRzdTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFXNWtaWGd1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTlqYjNKbEwybHVaR1Y0TG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lKQlFVTkJMRTlCUVU4c1JVRkJSU3hOUVVGTkxFVkJRVVVzVFVGQlRTeExRVUZMTEVOQlFVTTdRVUZQTjBJc1RVRkJUU3h4UWtGQmNVSXNSMEZCUnl4SlFVRkpMRTFCUVUwc1EwRkJReXhYUVVGWExFVkJRVVVzUjBGQlJ5eERRVUZETEVOQlFVRTdRVUZGTVVRc1RVRkJUU3hyUWtGQmEwSXNSMEZCUnl4SlFVRkpMRTFCUVUwc1EwRkJReXhYUVVGWExFVkJRVVVzUjBGQlJ5eERRVUZETEVOQlFVRTdRVUZGZGtRc1RVRkJUU3hOUVVGTkxFZEJRVWNzUzBGQlN5eERRVUZCTzBGQlMzQkNPenRIUVVWSE8wRkJRMGdzVTBGQlV5eHpRa0ZCYzBJc1EwRkJReXhKUVVGcFFpeEZRVUZGTEZGQlFYVkVPMGxCUlhSSExFbEJRVWNzU1VGQlNTeERRVUZETEZWQlFWVXNSVUZCUXp0UlFVVm1MRTFCUVUwc1ZVRkJWU3hIUVVGSExFMUJRVTBzUTBGQlF5eE5RVUZOTEVOQlFVVXNTVUZCU1N4RFFVRkRMRlZCUVZVc1EwRkJSU3hEUVVGRE8xRkJSWEJFTEVsQlFVY3NWVUZCVlN4RFFVRkRMRTFCUVUwc1JVRkJRenRaUVVWcVFpeFZRVUZWTEVOQlFVTXNSMEZCUnl4RFFVRkRMRk5CUVZNc1EwRkJRU3hGUVVGRk8yZENRVVYwUWl4TlFVRk5MRTlCUVU4c1IwRkJSeXhEUVVGRExFZEJRVWNzVTBGQlV5eERRVUZETEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc2NVSkJRWEZDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMmRDUVVWeVJTeFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1MwRkJTeXhGUVVGRkxFTkJRVU1zUlVGQlF5eEZRVUZGTEVkQlFVVXNUMEZCVHl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEU5QlFVOHNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUVN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGQk8yZENRVVZxUlN4UlFVRlJMRU5CUVVNN2IwSkJRMHdzVDBGQlR5eEZRVUZGTEVsQlFVazdiMEpCUTJJc1UwRkJVeXhGUVVGRkxFbEJRVWs3YjBKQlEyWXNZVUZCWVN4RlFVRkZMRk5CUVZNc1EwRkJReXhKUVVGSk8yOUNRVU0zUWl4UFFVRlBMRVZCUVVVc1MwRkJTenR2UWtGRFpDeFBRVUZQTEVWQlFVVXNUMEZCVHp0dlFrRkRhRUlzVFVGQlRTeEZRVUZGTEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUVVNc1NVRkJTU3hEUVVGblFqdHBRa0ZET1VNc1EwRkJReXhEUVVGQk8xbEJSVTRzUTBGQlF5eERRVUZETEVOQlFVRTdVMEZGVER0TFFVVktPMGxCUlVRc1QwRkJUeXh6UWtGQmMwSXNRMEZCUXp0QlFVVnNReXhEUVVGRE8wRkJTMFE3TzBkQlJVYzdRVUZEU0N4VFFVRlRMRzFDUVVGdFFpeERRVUZETEVsQlFXbENMRVZCUVVVc1VVRkJkVVE3U1VGRmJrY3NUVUZCVFN4UFFVRlBMRWRCUVVjc1EwRkJReXhIUVVGSExFbEJRVWtzUTBGQlF5eFRRVUZUTEVOQlFVTXNVVUZCVVN4RFFVRkRMSEZDUVVGeFFpeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVVndSU3hKUVVGSExFOUJRVThzUTBGQlF5eE5RVUZOTEVWQlFVTTdVVUZGWkN4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUzBGQlN5eEZRVUZGTEVOQlFVTXNSVUZCUXl4RlFVRkZMRWRCUVVVc1QwRkJUeXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRTlCUVU4c1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJRU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZCTzFGQlJXcEZMRkZCUVZFc1EwRkJRenRaUVVOTUxFOUJRVThzUlVGQlJTeEpRVUZKTzFsQlEySXNVMEZCVXl4RlFVRkZMRXRCUVVzN1dVRkRhRUlzVDBGQlR5eEZRVUZGTEVsQlFVazdXVUZEWWl4UFFVRlBMRVZCUVVVc1QwRkJUenRaUVVOb1FpeE5RVUZOTEVWQlFVVXNTVUZCU1N4RFFVRkRMRk5CUVZNc1EwRkJReXhKUVVGSkxFTkJRV2RDTzFOQlF6bERMRU5CUVVNc1EwRkJRVHRMUVVWTU8wbEJSMFFzVDBGQlR5eHRRa0ZCYlVJc1EwRkJRenRCUVVVdlFpeERRVUZETzBGQlMwUTdPMGRCUlVjN1FVRkRTQ3hUUVVGVExGbEJRVmtzUTBGQlF5eEpRVUZwUWl4RlFVRkZMRkZCUVhWRU8wbEJSVFZHTEUxQlFVMHNVVUZCVVN4SFFVRnJRaXhOUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVd0Q0xFTkJRVUU3U1VGSE4wVXNTVUZCUnl4UlFVRlJMRU5CUVVNc1RVRkJUU3hGUVVGRE8xRkJSV1lzVVVGQlVTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVFc1JVRkJSVHRaUVVWYUxITkNRVUZ6UWl4RFFVRkRMRU5CUVVNc1JVRkJSU3hSUVVGUkxFTkJRVU1zUTBGQlFUdFpRVVZ1UXl4WFFVRlhMRU5CUVVNc1EwRkJReXhGUVVGRkxGRkJRVkVzUTBGQlF5eERRVUZCTzFsQlJYaENMRmxCUVZrc1EwRkJReXhEUVVGRExFVkJRVVVzVVVGQlVTeERRVUZETEVOQlFVRTdVVUZGTjBJc1EwRkJReXhEUVVGRExFTkJRVUU3UzBGRlREdFRRVVZITzFGQlJVRXNiVUpCUVcxQ0xFTkJRVU1zU1VGQlNTeEZRVUZGTEZGQlFWRXNRMEZCUXl4RFFVRkJPMHRCUlhSRE8wbEJSVVFzVDBGQlR5eFpRVUZaTEVOQlFVTTdRVUZGZUVJc1EwRkJRenRCUVV0RU96dEhRVVZITzBGQlEwWXNVMEZCVXl4WFFVRlhMRU5CUVVNc1NVRkJhVUlzUlVGQlJTeFJRVUYxUkR0SlFVYzFSaXhOUVVGTkxFOUJRVThzUjBGQlJ5eERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRMRk5CUVZNc1EwRkJReXhSUVVGUkxFTkJRVU1zYTBKQlFXdENMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJSV3BGTEVsQlFVY3NUMEZCVHl4RFFVRkRMRTFCUVUwc1JVRkJRenRSUVVWa0xFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4TFFVRkxMRVZCUVVVc1EwRkJReXhGUVVGRExFVkJRVVVzUjBGQlJTeFBRVUZQTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFZEJRVWNzVDBGQlR5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZCTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVFN1VVRkZha1VzVVVGQlVTeERRVUZETzFsQlEwd3NUMEZCVHl4RlFVRkZMRWxCUVVrN1dVRkRZaXhSUVVGUkxFVkJRVVVzU1VGQlNUdFpRVU5rTEU5QlFVOHNSVUZCUlN4UFFVRlBPMWxCUTJoQ0xFMUJRVTBzUlVGQlJTeEpRVUZKTEVOQlFVTXNVMEZCVXl4RFFVRkRMRWxCUVVrc1EwRkJaMEk3VTBGRE9VTXNRMEZCUXl4RFFVRkJPMHRCUlV3N1NVRkZSQ3hQUVVGUExHMUNRVUZ0UWl4RFFVRkRPMEZCUlM5Q0xFTkJRVU03UVVGTFJEczdSMEZGUnp0QlFVTklMRk5CUVZNc2JVSkJRVzFDTEVOQlFVa3NTVUZCYVVJc1JVRkJSU3haUVVGbExFVkJRVVVzVVVGQmRVUTdTVUZGZGtnc1NVRkJSeXhaUVVGWkxFVkJRVU03VVVGRldpeE5RVUZOTEdGQlFXRXNSMEZCUnl4TlFVRk5MRU5CUVVNc1QwRkJUeXhEUVVGRExGbEJRVmtzUTBGQlF5eERRVUZETzFGQlJXNUVMRWxCUVVjc1lVRkJZU3hEUVVGRExFMUJRVTBzUlVGQlF6dFpRVVZ3UWl4aFFVRmhMRU5CUVVNc1IwRkJSeXhEUVVGRExFdEJRVXNzUTBGQlFTeEZRVUZGTzJkQ1FVVnlRaXhOUVVGTkxFOUJRVThzUjBGQlJ5eERRVUZETEVkQlFVY3NaMEpCUVdkQ0xFTkJRVU1zU1VGQlNTeERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRMRkZCUVZFc1EwRkJReXhKUVVGSkxFMUJRVTBzUTBGQlF5eEhRVUZKTEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVVc1JVRkJSU3hGUVVGRkxFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0blFrRkZha2NzU1VGQlJ5eFBRVUZQTEVOQlFVTXNUVUZCVFN4RlFVRkRPMjlDUVVWa0xITkVRVUZ6UkR0dlFrRkZkRVFzVVVGQlVTeERRVUZETzNkQ1FVTk1MRTlCUVU4c1JVRkJSU3hKUVVGSk8zZENRVU5pTEZGQlFWRXNSVUZCUlN4SlFVRkpPM2RDUVVOa0xFOUJRVThzUlVGQlJTeEpRVUZKTzNkQ1FVTmlMRTlCUVU4c1JVRkJSU3hQUVVGUE8zZENRVU5vUWl4TlFVRk5MRVZCUVVVc1NVRkJTU3hEUVVGRExGTkJRVk1zUTBGQlF5eEpRVUZKTEVOQlFXZENPM0ZDUVVNNVF5eERRVUZETEVOQlFVRTdhVUpCUTB3N1dVRkhUQ3hEUVVGRExFTkJRVU1zUTBGQlFUdFRRVVZNTzB0QlJVbzdTVUZIUkN4UFFVRlBMRzFDUVVGdFFpeERRVUZETzBGQlJTOUNMRU5CUVVNN1FVRkxSRHM3UjBGRlJ6dEJRVU5JTEZOQlFWTXNZMEZCWXl4RFFVRkRMRXRCUVdFc1JVRkJSU3hWUVVGclF6dEpRVU55UlN4UFFVRlBMRTFCUVUwc1EwRkJReXhIUVVGSkxFdEJRVTBzUlVGQlJTeEZRVUZGTEZWQlFWVXNSVUZCUlR0UlFVTndReXhUUVVGVExFVkJRVVVzUjBGQlNTeE5RVUZQTEVWQlFVVTdVVUZEZUVJc1RVRkJUU3hGUVVGRkxFbEJRVWs3UzBGRFppeERRVUZETEVOQlFVRTdRVUZEVGl4RFFVRkRPMEZCVVVRN08wZEJSVWM3UVVGRFNDeFRRVUZUTEdOQlFXTXNRMEZCU1N4VFFVRjVRaXhGUVVGRkxFbEJRV2xDTzBsQlJXNUZMRmxCUVZrc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eE5RVUZOTEVWQlFVTXNSVUZCUlR0UlFVVjZRaXhKUVVGSExFMUJRVTBzUTBGQlF5eFBRVUZQTEVOQlFVTXNUVUZCVFN4RlFVRkRPMWxCUlhKQ0xHRkJRV0U3V1VGRFlpeE5RVUZOTEVOQlFVTXNUMEZCVHl4RFFVRkRMRkZCUVZFc1IwRkJSeXhUUVVGVExFTkJRVU1zVFVGQlRTeERRVUZETzFsQlJ6TkRMRWxCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zVVVGQlVTeEZRVUZETzJkQ1FVVm9RaXhOUVVGTkxFTkJRVU1zVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4TFFVRkxMRU5CUVVFc1JVRkJSVHR2UWtGRmRFSXNUVUZCVFN4SFFVRkhMRWRCUVVjc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQldTeERRVUZETzI5Q1FVVm9ReXhKUVVGSExFZEJRVWNzU1VGQlNTeFRRVUZUTEVOQlFVTXNZVUZCWVN4RlFVRkRPM2RDUVVVNVFpeFRRVUZUTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWRCUVVjc1JVRkJSU3hOUVVGTkxFTkJRVU1zUTBGQlFUdDNRa0ZGT1VJc1UwRkJVeXhEUVVGRExHdENRVUZyUWl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGQk8zRkNRVWR3UXp0dlFrRkZSQ3hSUVVGUk8yOUNRVVZTTERKSFFVRXlSenR2UWtGRk0wY3NTVUZCU1R0blFrRkZVaXhEUVVGRExFTkJRVU1zUTBGQlFUdGhRVVZNTzFOQlIwbzdTVUZGVEN4RFFVRkRMRU5CUVVNc1EwRkJRVHRCUVVWT0xFTkJRVU03UVVGUFJEczdSMEZGUnp0QlFVTklMRk5CUVZNc1YwRkJWeXhEUVVGSkxGTkJRWGxDTEVWQlFVVXNUVUZCYlVNc1JVRkJSU3hMUVVGMVFqdEpRVVV6Unl4SlFVRkhMRTFCUVUwc1EwRkJReXhQUVVGUExFVkJRVU03VVVGRlpDeE5RVUZOTEVOQlFVTXNUMEZCVHl4RFFVRkRMRk5CUVZNc1IwRkJSeXhqUVVGakxFTkJRVU1zUTBGRGRFTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1RVRkJUU3hGUVVGRkxGTkJRVk1zU1VGQlJTeEZRVUZGTEVOQlFVTTdZVUZEZWtJc1QwRkJUeXhEUVVGRExFbEJRVWtzVFVGQlRTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRkxFbEJRVWtzVFVGQlRTeEpRVUZMTEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVVc1IwRkJSeXhOUVVGTkxFZEJRVWNzUTBGQlJTeERRVU0xUlN4RlFVRkhMRk5CUVZNc1EwRkJReXhoUVVGaExFbEJRVWtzUlVGQlR5eERRVUZETEVOQlFVRTdTMEZGTVVNN1NVRkZSQ3hKUVVGSExFMUJRVTBzUTBGQlF5eFRRVUZUTEVWQlFVTTdVVUZGYUVJc1NVRkJSeXhOUVVGTkxFTkJRVU1zWVVGQllTeEZRVUZGTzFsQlJYSkNMRTFCUVUwc1EwRkJReXhQUVVGUExFTkJRVU1zV1VGQldTeERRVUZETEUxQlFVMHNRMEZCUXl4aFFVRmhMRVZCUVVVc1kwRkJZeXhEUVVGRExFTkJRemRFTEVOQlFVTXNUVUZCVFN4RFFVRkRMRTFCUVUwc1JVRkJSU3haUVVGWkxFTkJRVU1zVFVGQlRTeERRVUZETEdGQlFXRXNRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJReXhEUVVGRExFOUJRVThzUTBGQlF5eEpRVUZKTEUxQlFVMHNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUlVGQlJTeEpRVUZKTEUxQlFVMHNTVUZCU3l4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRkxFZEJRVWNzVFVGQlRTeEhRVUZITEVOQlFVVXNRMEZEYWtrc1JVRkJSeXhUUVVGVExFTkJRVU1zWVVGQllTeEpRVUZKTEVWQlFVOHNRMEZCUXl4RFFVRkZMRU5CUVVFN1UwRkZOVU03UzBGRlNqdEpRVVZFTEU5QlFVOHNWMEZCVnl4RFFVRkRPMEZCUlhaQ0xFTkJRVU03UVVGUlJDeFRRVUZUTEdkQ1FVRm5RaXhEUVVGRExFOUJRV1U3U1VGRGNrTXNUMEZCVHl4RFFVRkRMRTlCUVU4c1NVRkJSU3hGUVVGRkxFTkJRVU1zUTBGQlF5eFBRVUZQTEVOQlFVTXNUMEZCVHl4RlFVRkZMRWRCUVVjc1EwRkJReXhEUVVGRExFOUJRVThzUTBGQlF5eFBRVUZQTEVWQlFVVXNSMEZCUnl4RFFVRkRMRU5CUVVFN1FVRkRjRVVzUTBGQlF6dEJRVkZFTEUxQlFVMHNWMEZCVnp0SlFXbENZaXc0UkVGQk9FUTdTVUZIT1VRN08wOUJSVWM3U1VGRFNDeFpRVUZaTEV0QlFUSkNPMUZCUlc1RExITkNRVUZ6UWp0UlFYUkNNVUlzWlVGQlZTeEhRVUZYTEVOQlFVTXNRMEZCUXp0UlFVVjJRaXhoUVVGUkxFZEJRWGRDTEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNN1VVRkpPVU1zYjBKQlFXVXNSMEZCYjBJc1NVRkJTU3hEUVVGRE8xRkJSWGhETEd0Q1FVRmhMRWRCUVUwc1JVRkJUeXhEUVVGRE8xRkJSVE5DTEZkQlFVMHNSMEZCVFN4RlFVRlBMRU5CUVVNN1VVRkZjRUlzVlVGQlN5eEhRVUU0UkN4RlFVRkZMRU5CUVVNN1VVRlpiRVVzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhOUVVGTkxFVkJRVVVzUTBGQlF5eE5RVUZOTEVWQlFVVXNRMEZCUXp0SlFVVjJReXhEUVVGRE8wbEJSVVFzU1VGQlNTeERRVUZETEV0QlFUSkNPMUZCUlRWQ0xIZENRVUYzUWp0UlFVVjRRaXhKUVVGSkxFTkJRVU1zVVVGQlVTeEhRVUZITEVOQlFVTXNTMEZCU3l4RFFVRkRMRTlCUVU4c1dVRkJXU3hYUVVGWExFTkJRVU03V1VGRmJFUXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhQUVVGUE8xbEJSV1lzUTBGQlF5eERRVUZETEVOQlJVVXNUMEZCVHl4TFFVRkxMRU5CUVVNc1QwRkJUeXhKUVVGSkxGRkJRVkU3WjBKQlJUVkNMRU5CUVVNc1EwRkJReXhSUVVGUkxFTkJRVU1zWVVGQllTeERRVUZETEVkQlFVa3NTMEZCU3l4RFFVRkRMRTlCUVZFc1JVRkJSU3hEUVVGRE8yZENRVVU1UXl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVWaUxFTkJRVUU3VVVGRlRDeEpRVUZKTEVOQlFVTXNZVUZCWVN4SFFVRkhMRXRCUVVzc1EwRkJReXhaUVVGWkxFbEJRVWtzUlVGQlR5eERRVUZETzFGQlJXNUVMRWxCUVVrc1EwRkJReXhOUVVGTkxFZEJRVWNzVFVGQlRTeERRVUZETEUxQlFVMHNRMEZCUXl4RlFVRkZMRVZCUVVVc1NVRkJTU3hEUVVGRExHRkJRV0VzUTBGQlF5eERRVUZCTzFGQlIyNUVMRTFCUVUwc1EwRkJReXg1UWtGQmVVSXNSMEZCUnl4TlFVRk5MRU5CUVVNc2VVSkJRWGxDTEVsQlFVa3NSVUZCUlN4RFFVRkJPMUZCUlhwRkxFbEJRVWtzUTBGQlF5eFZRVUZWTEVkQlFVY3NUVUZCVFN4RFFVRkRMSGxDUVVGNVFpeERRVUZETEUxQlFVMHNRMEZCUXp0UlFVVXhSQ3hOUVVGTkxFTkJRVU1zZVVKQlFYbENMRU5CUVVVc1NVRkJTU3hEUVVGRExGVkJRVlVzUTBGQlJTeEhRVUZITEVsQlFVa3NRMEZCUVR0UlFVY3hSQ3hQUVVGUExFbEJRVWtzUTBGQlF6dEpRVVZvUWl4RFFVRkRPMGxCVFVRc2EwSkJRV3RDTEVOQlFVTXNSMEZCWVR0UlFVYzFRaXhKUVVGSExFZEJRVWNzU1VGQlNTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RlFVRkRPMWxCUldwQ0xFMUJRVTBzVDBGQlR5eEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVVc1IwRkJSeXhEUVVGRkxFTkJRVU03V1VGRmJFTXNUMEZCVHl4RlFVRkZMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVUVzUlVGQlJUdG5Ra0ZGYWtJc1NVRkJSeXhOUVVGTkxFVkJRVU03YjBKQlJVNHNUVUZCVFN4RFFVRkRMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zUzBGQlN5eERRVUZCTEVWQlFVVTdkMEpCUlhSQ0xFbEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNVVUZCVVN4RlFVRkRPelJDUVVWb1FpeFhRVUZYTEVOQlFVa3NTVUZCU1N4RlFVRkZMRTFCUVUwc1JVRkJSU3hMUVVGTExFTkJRVU1zUTBGQlF6dDVRa0ZGZGtNN05rSkJSVWM3TkVKQlJVRXNTVUZCUnl4TlFVRk5MRU5CUVVNc1QwRkJUeXhGUVVGRE8yZERRVVZrTEUxQlFVMHNVVUZCVVN4SFFVRkhMR05CUVdNc1EwRkJReXhuUWtGQlowSXNRMEZCUXl4TlFVRk5MRU5CUVVNc1RVRkJUU3hGUVVGRkxGTkJRVk1zU1VGQlJTeEZRVUZGTEVOQlFVTXNSVUZCUlN4SlFVRkpMRU5CUVVNc1lVRkJZU3hEUVVGRExFTkJRVU03WjBOQlJYQkhMRTFCUVUwc1EwRkJReXhQUVVGUExFTkJRVU1zVTBGQlV5eEhRVUZITEZGQlFWRXNRMEZCUVR0blEwRkZia01zV1VGQldTeERRVUZETEUxQlFVMHNRMEZCUXl4UFFVRlBMRVZCUVVVc1EwRkJReXhIUVVGSExFVkJRVU1zUlVGQlJUdHZRMEZGYUVNc1NVRkJSeXhIUVVGSExFTkJRVU1zVDBGQlR5eERRVUZETEUxQlFVMHNSVUZCUXp0M1EwRkZiRUlzVFVGQlRTeERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEVkQlFVY3NRMEZCUVN4RlFVRkZPelJEUVVWb1F5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUlVGQlJTeEhRVUZITEVOQlFVTXNRMEZCUVRzMFEwRkZla0lzVjBGQlZ5eERRVUZKTEVsQlFVa3NSVUZCUlN4SFFVRkhMRVZCUVVVc1IwRkJSeXhEUVVGRExFTkJRVU03ZDBOQlJXNURMRU5CUVVNc1EwRkJReXhEUVVGQk8zRkRRVVZNTzJkRFFVZE1MRU5CUVVNc1EwRkJReXhEUVVGQk96WkNRVWRNTzNsQ1FVVktPMjlDUVVWTUxFTkJRVU1zUTBGQlF5eERRVUZCTzJsQ1FVVk1PMWxCUjB3c1EwRkJReXhEUVVGRExFTkJRVUU3VTBGSFREdFJRVVZFTEU5QlFVOHNTVUZCU1N4RFFVRkRPMGxCUldoQ0xFTkJRVU03U1VGTlJDeE5RVUZOTzFGQlJVWXNTVUZCUnl4SlFVRkpMRU5CUVVNc1RVRkJUU3hGUVVGRE8xbEJSVmdzVFVGQlRTeFJRVUZSTEVkQlFVY3NUVUZCVFN4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTTdXVUZKTjBNN08yVkJSVWM3V1VGRFNDeEpRVUZITEZGQlFWRXNRMEZCUXl4TlFVRk5MRVZCUVVNN1owSkJSV1lzVFVGQlRTeEpRVUZKTEVkQlFVY3NTVUZCU1N4RFFVRkRPMmRDUVVkc1FqczdiVUpCUlVjN1owSkJRMGdzVVVGQlVTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVFc1JVRkJSVHR2UWtGRldpeEpRVUZITEU5QlFVOHNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhKUVVGSkxGRkJRVkVzUlVGQlF6dDNRa0ZGZGtJc1RVRkJUU3hKUVVGSkxFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCV1N4RFFVRkRPM2RDUVVVM1FpeE5RVUZOTEUxQlFVMHNSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEZGQlFWRXNRMEZCUXl4eFFrRkJjVUlzUTBGQlF5eERRVUZETEVOQlFVRTdkMEpCUlhoRUxFbEJRVWNzVFVGQlRTeERRVUZETEUxQlFVMHNSVUZCUXpzMFFrRkZZaXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEV0QlFVc3NRMEZCUVN4RlFVRkZPMmREUVVWa0xFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTXNSMEZCUnl4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVRTdaME5CUlRGQ0xFbEJRVWtzUTBGQlF5eGhRVUZoTEVOQlFVVXNTVUZCU1N4RFFVRkZMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRTFCUVUwc1EwRkJReXhIUVVGSkxFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVVXNSVUZCUlN4RFFVRkRMRVZCUVVVc1NVRkJTU3hEUVVGRExFMUJRVTBzUTBGQlJTeExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVVc1EwRkJReXhEUVVGRE96UkNRVVZ3Unl4RFFVRkRMRU5CUVVNc1EwRkJRVHQ1UWtGRlREdHhRa0ZIU2p0blFrRkZUQ3hEUVVGRExFTkJRVU1zUTBGQlFUdG5Ra0ZMUmpzN2JVSkJSVWM3WjBKQlJVZ3NUVUZCVFN4UFFVRlBMRWRCUVVjc1RVRkJUU3hEUVVGRExFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNN1owSkJSVFZETEU5QlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGQkxFVkJRVVU3YjBKQlJWZ3NUVUZCVFN4SlFVRkpMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQldTeERRVUZETzI5Q1FVYzNRanM3ZFVKQlJVYzdiMEpCUTBnc1NVRkJSeXhQUVVGUExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNTVUZCU1N4UlFVRlJMRVZCUVVNN2QwSkJSM1pDT3pzeVFrRkZSenQzUWtGRlNDeEpRVUZITEV0QlFVc3NRMEZCUXl4UFFVRlBMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVWQlFVTTdORUpCUlc1Q0xFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVVXNTVUZCU1N4RFFVRkZMRWRCUVVjc1NVRkJTU3hMUVVGTExFTkJRV01zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RlFVRkZPMmREUVVVdlF5eEhRVUZITEVOQlFVTXNUVUZCVFN4RlFVRkZMRWxCUVVrc1JVRkJSU3hQUVVGUE8yOURRVVZ5UWl4SlFVRkhMRTlCUVU4c1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEZWQlFWVXNSVUZCUXp0M1EwRkZha01zUTBGQlF5eEhRVUZGTEVWQlFVVTdORU5CUTBRc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eDNRa0ZCZDBJc1JVRkJSU3hKUVVGSkxFTkJRVU1zUTBGQlFUczBRMEZETlVNc1QwRkJUeXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVRTdkME5CUTNaQ0xFTkJRVU1zUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXl4TlFVRk5MRVZCUVVVc1QwRkJUeXhQUVVGUExFbEJRVWtzVVVGQlVTeERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRlBMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTXNRMEZCUVR0eFEwRkZja1U3ZVVOQlJVYzdkME5CUlVFc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eEhRVUZITEU5QlFVOHNRMEZCUVR0eFEwRkZla0k3YjBOQlJVUXNTVUZCU1N4RFFVRkRMR0ZCUVdFc1EwRkJSU3hKUVVGSkxFTkJRVVVzUjBGQlJ5eE5RVUZOTEVOQlFVRTdiME5CUlc1RExFbEJRVWtzUTBGQlF5eHJRa0ZCYTBJc1EwRkJSU3hKUVVGSkxFTkJRVVVzUTBGQlFUdHZRMEZGTDBJc1QwRkJUeXhKUVVGSkxFTkJRVU03WjBOQlJXaENMRU5CUVVNN05rSkJSVW9zUTBGQlF5eERRVUZCT3pSQ1FVVkdMRWxCUVVrc1EwRkJReXhoUVVGaExFTkJRVVVzU1VGQlNTeERRVUZGTEVkQlFVY3NTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJSU3hKUVVGSkxFTkJRVVVzUTBGQlFUczBRa0ZGYUVRc1NVRkJTU3hEUVVGRExFMUJRVTBzUTBGQlJTeEpRVUZKTEVOQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRExGRkJRVkVzUTBGQlF5eERRVUZCTzNsQ1FVZDBRenMyUWtGSFJ6czBRa0ZGUVN4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExHbENRVUZwUWl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGQk8zbENRVVZ5UXp0eFFrRkZTanQ1UWtGRlJ6dDNRa0ZGUVN4TlFVRk5MRU5CUVVNc1kwRkJZeXhEUVVGRExFbEJRVWtzUTBGQlF5eE5RVUZOTEVWQlFVVXNSMEZCU1N4SlFVRkxMRVZCUVVVc1JVRkJSVHMwUWtGRk5VTXNSMEZCUnl4RlFVRkZMR05CUVZrc1QwRkJUeXhKUVVGSkxFTkJRVU1zWVVGQllTeERRVUZGTEVsQlFVa3NRMEZCUlN4RFFVRkRMRU5CUVVNc1EwRkJRenMwUWtGRmNrUXNSMEZCUnl4RlFVRkZMRlZCUVZNc1MwRkJTenRuUTBGRlppeEpRVUZKTEVOQlFVTXNZVUZCWVN4RFFVRkZMRWxCUVVrc1EwRkJSU3hIUVVGSExFdEJRVXNzUTBGQlFUdG5RMEZGYkVNc1NVRkJTU3hEUVVGRExHdENRVUZyUWl4RFFVRkZMRWxCUVVrc1EwRkJSU3hEUVVGQk96UkNRVVZ1UXl4RFFVRkRPM2xDUVVOS0xFTkJRVU1zUTBGQlFUdHhRa0ZGVER0blFrRkhUQ3hEUVVGRExFTkJRVU1zUTBGQlFUdGhRVVZNTzFOQlJVbzdVVUZIUkN4UFFVRlBMRWxCUVVrc1EwRkJRenRKUVVWb1FpeERRVUZETzBsQlNVUXNUMEZCVHl4RFFVRkRMRWRCUVZrc1JVRkJSU3hOUVVGdFF6dFJRVVZ5UkN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRkxFZEJRVWNzUTBGQlJTeEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVVc1IwRkJSeXhEUVVGRkxFbEJRVWtzUlVGQlJTeERRVUZETzFGQlJUVkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVVVzUjBGQlJ5eERRVUZGTEVWQlFVVXNTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJReXhEUVVGQk8xRkJSUzlDTEU5QlFVOHNTVUZCU1N4RFFVRkRPMGxCUldoQ0xFTkJRVU03U1VGVFJDeE5RVUZOTzFGQlIwWXNTVUZCUnl4SlFVRkpMRU5CUVVNc1VVRkJVU3haUVVGWkxGZEJRVmNzUlVGQlF6dFpRVVZ3UXl4SlFVRkpMRU5CUVVNc1pVRkJaU3hIUVVGSExFTkJRVU1zU1VGQlNTeFRRVUZUTEVWQlFVVXNRMEZCUXl4RFFVRkRMR1ZCUVdVc1EwRkJReXhKUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETEZOQlFWTXNSVUZCUlN4WFFVRlhMRU5CUVVNc1EwRkJRVHRaUVVjNVJqczdaVUZGUnp0WlFVVkdMRmxCUVZrc1EwRkJReXhKUVVGSkxFTkJRVU1zWlVGQlpTeERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRTFCUVUwc1JVRkJReXhGUVVGRk8yZENRVVV2UXl4SlFVRkhMRTFCUVUwc1EwRkJReXhQUVVGUExFTkJRVU1zVFVGQlRTeEZRVUZETzI5Q1FVVnlRaXhoUVVGaE8yOUNRVU5pTEUxQlFVMHNRMEZCUXl4UFFVRlBMRU5CUVVNc1VVRkJVU3hIUVVGSExFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTTdiMEpCUlhSRExFbEJRVWNzVFVGQlRTeERRVUZETEZGQlFWRXNSVUZCUXp0M1FrRkZaaXhKUVVGSExFMUJRVTBzUTBGQlF5eFBRVUZQTEVWQlFVTTdORUpCUldRc1RVRkJUU3hEUVVGRExFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNTMEZCU3l4RFFVRkJMRVZCUVVVN1owTkJSWFJDTEUxQlFVMHNRMEZCUXl4UFFVRlBMRU5CUVVNc1UwRkJVeXhIUVVGSExFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1RVRkJUU3hEUVVGRExFOUJRVThzUTBGQlF5eFRRVUZUTEVsQlFVVXNSVUZCUlN4RFFVRkRMRU5CUVVNc1QwRkJUeXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTXNSVUZCUlN4SlFVRkpMRTFCUVUwc1IwRkJTU3hMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZGTEVkQlFVY3NUVUZCVFN4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGQk96UkNRVVYwU1N4RFFVRkRMRU5CUVVNc1EwRkJRVHMwUWtGRlJpeHRRa0ZCYlVJc1EwRkJTU3hOUVVGTkxFTkJRVU1zVDBGQlR5eEZRVUZGTEVsQlFVa3NRMEZCUXl4aFFVRmhMRVZCUVVVc1EwRkJReXhIUVVGSExFVkJRVU1zUlVGQlJUdG5RMEZGT1VRc1NVRkJSeXhIUVVGSExFTkJRVU1zVVVGQlVTeEZRVUZETzI5RFFVVmFMRWxCUVVjc1IwRkJSeXhEUVVGRExFOUJRVThzUTBGQlF5eE5RVUZOTEVWQlFVTTdkME5CUld4Q0xFZEJRVWNzUTBGQlF5eFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJRU3hGUVVGRk96UkRRVVZxUWl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFWa3NSVUZCUlN4SFFVRkhMRU5CUVVNc1EwRkJRVHQzUTBGRmVFTXNRMEZCUXl4RFFVRkRMRU5CUVVFN2NVTkJSVXc3YVVOQlJVbzdORUpCUlV3c1EwRkJReXhEUVVGRExFTkJRVUU3TkVKQlJVWXNTVUZCUnp0blEwRkZReXhOUVVGTkxFTkJRVU1zVDBGQlR5eERRVUZETEZOQlFWTXNSMEZCUnl4SFFVRkpMR05CUVdNc1EwRkJReXhuUWtGQlowSXNRMEZCUXl4TlFVRk5MRU5CUVVNc1QwRkJUeXhEUVVGRExGTkJRVk1zU1VGQlJTeEZRVUZGTEVOQlFVTXNSVUZCUlN4SlFVRkpMRU5CUVVNc1lVRkJZU3hEUVVGRkxFVkJRVVVzUTBGQlFUczJRa0ZGZGtnN05FSkJRVUVzVDBGQlRTeERRVUZETEVWQlFVTTdaME5CUlV3c1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eG5Ra0ZCWjBJc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlFUczJRa0ZGYmtNN2VVSkJSVW83Y1VKQlIwbzdhVUpCUlVvN1dVRkZUQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVWxJT3p0bFFVVkhPMWxCUlVnc1kwRkJZeXhEUVVGSkxFbEJRVWtzUlVGQlJTeEpRVUZKTEVOQlFVTXNaVUZCWlN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGQk8xbEJSMnhFT3p0bFFVVkhPMWxCUTBnc1NVRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF5eFRRVUZUTEVkQlFVY3NSVUZCUlN4RFFVRkRPMWxCUlRkQ0xFMUJRVTBzVVVGQlVTeEhRVUZITEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVVc1NVRkJTU3hEUVVGRExHVkJRV1VzUTBGQlF5eEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkZMRU5CUVVNN1dVRkZja1VzU1VGQlJ5eFJRVUZSTEVOQlFVTXNUVUZCVFN4RlFVRkRPMmRDUVVWbUxGRkJRVkVzUTBGQlF5eEhRVUZITEVOQlFVTXNTMEZCU3l4RFFVRkRMRVZCUVVVN2IwSkJSV3BDTEVsQlFVa3NRMEZCUXl4UlFVRlJMRVZCUVVVc1YwRkJWeXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETzJkQ1FVVjBReXhEUVVGRExFTkJRVU1zUTBGQlFUdGhRVVZNTzFOQlJVbzdVVUZIUkN4UFFVRlBMRWxCUVVrc1EwRkJRenRKUVVWb1FpeERRVUZETzBOQlJVbzdRVUZQUkN4bFFVRmxMRmRCUVZjc1EwRkJRU0lzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSW1sdGNHOXlkQ0IwZVhCbElIc2dVMlZ1YzJWdVZFcDFkSE4xVDJKelpYSjJaWEpTWldOdmNtUnpMQ0JUWlc1elpXNVVTblYwYzNWUWNtOXdjeXdnVTJWdWMyVnVWRmRwYm1SdmR5QjlJR1p5YjIwZ1hDSXVMMmx1WkdWNExuUmNJanRjYm1sdGNHOXlkQ0I3SUhKbGJtUmxjaUI5SUdaeWIyMGdKMlZxY3ljN1hHNXBiWEJ2Y25RZ2V5QnRZWFJqYUNCOUlHWnliMjBnWENKaGMzTmxjblJjSWp0Y2JseHVYRzVrWldOc1lYSmxJR3hsZENCM2FXNWtiM2M2SUZObGJuTmxibFJYYVc1a2IzYzdYRzVjYmx4dVkyOXVjM1FnVTNsdWRHRjRWbUZ5YVdGaWJHVnpVbVZuUlhod0lEMGdibVYzSUZKbFowVjRjQ2duZTNzb0xpby9LWDE5Snl3Z0oyY25LVnh1WEc1amIyNXpkQ0JUZVc1MFlYaE9ZWFJwZG1WU1pXZEZlSEFnUFNCdVpYY2dVbVZuUlhod0tDZDdKU2d1S2o4cEpYMG5MQ0FuWnljcFhHNWNibU52Ym5OMElGTjVSR1YwY2lBOUlDY2xjMjRuWEc1Y2JseHVYRzVjYmk4cUtseHVJQ29nUld4bGJXVnVkQ0JCZEhSeWFXSjFkR1Z6SUU5aWMyVnlkbVZ5WEc0Z0tpOWNibVoxYm1OMGFXOXVJQ1JFVDAxQmRIUnlhV0oxZEdWelQySnpaWEoyWlhJb2FIUnRiRG9nU0ZSTlRFVnNaVzFsYm5Rc0lHTmhiR3hpWVdOck9pQW9jbVZqYjNKa09pQlRaVzV6Wlc1VVNuVjBjM1ZQWW5ObGNuWmxjbEpsWTI5eVpITXBJRDArSUhadmFXUXBlMXh1WEc0Z0lDQWdhV1lvYUhSdGJDNWhkSFJ5YVdKMWRHVnpLWHRjYmx4dUlDQWdJQ0FnSUNCamIyNXpkQ0JoZEhSeWFXSjFkR1Z6SUQwZ1QySnFaV04wTG5aaGJIVmxjeWdnYUhSdGJDNWhkSFJ5YVdKMWRHVnpJQ2s3WEc1Y2JpQWdJQ0FnSUNBZ2FXWW9ZWFIwY21saWRYUmxjeTVzWlc1bmRHZ3BlMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQmhkSFJ5YVdKMWRHVnpMbTFoY0NoaGRIUnlhV0oxZEdVOVBudGNibHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR052Ym5OMElHMWhkR05vWlhNZ1BTQmJMaTR1WVhSMGNtbGlkWFJsTG5aaGJIVmxMbTFoZEdOb1FXeHNLRk41Ym5SaGVGWmhjbWxoWW14bGMxSmxaMFY0Y0NsZE8xeHVYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdiV0YwWTJobGN5NXRZWEFvS0cxaGRHTm9MQ0JyS1QwK2V5QnRZWFJqYUdWelcydGRXekZkSUQwZ2JXRjBZMmhsYzF0clhWc3hYUzUwY21sdEtDa2dmU2xjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdOaGJHeGlZV05yS0h0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdaV3hsYldWdWREb2dhSFJ0YkN4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZWFIwY21saWRYUmxPaUIwY25WbExGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JoZEhSeWFXSjFkR1ZPWVcxbE9pQmhkSFJ5YVdKMWRHVXVibUZ0WlN4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMjl1ZEdWdWREb2dabUZzYzJVc1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRzFoZEdOb1pYTTZJRzFoZEdOb1pYTXNYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUcxdlkydDFjRG9nYUhSdGJDNWpiRzl1WlU1dlpHVW9kSEoxWlNrZ1lYTWdTRlJOVEVWc1pXMWxiblJjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5S1Z4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0I5S1Z4dUlDQWdJQ0FnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnWEc0Z0lDQWdmVnh1WEc0Z0lDQWdjbVYwZFhKdUlDUkVUMDFCZEhSeWFXSjFkR1Z6VDJKelpYSjJaWEk3WEc0Z0lDQWdYRzU5WEc1Y2JseHVYRzVjYmk4cUtseHVJQ29nUld4bGJXVnVkQ0JEYjI1MFpXNTBJRTlpYzJWeWRtVnlYRzRnS2k5Y2JtWjFibU4wYVc5dUlDUkVUMDFEYjI1MFpXNTBUMkp6WlhKMlpYSW9hSFJ0YkRvZ1NGUk5URVZzWlcxbGJuUXNJR05oYkd4aVlXTnJPaUFvY21WamIzSmtPaUJUWlc1elpXNVVTblYwYzNWUFluTmxjblpsY2xKbFkyOXlaSE1wSUQwK0lIWnZhV1FwZTF4dVhHNGdJQ0FnWTI5dWMzUWdiV0YwWTJobGN5QTlJRnN1TGk1b2RHMXNMbWx1Ym1WeVZHVjRkQzV0WVhSamFFRnNiQ2hUZVc1MFlYaFdZWEpwWVdKc1pYTlNaV2RGZUhBcFhUdGNibHh1SUNBZ0lHbG1LRzFoZEdOb1pYTXViR1Z1WjNSb0tYdGNibHh1SUNBZ0lDQWdJQ0J0WVhSamFHVnpMbTFoY0Nnb2JXRjBZMmdzSUdzcFBUNTdJRzFoZEdOb1pYTmJhMTFiTVYwZ1BTQnRZWFJqYUdWelcydGRXekZkTG5SeWFXMG9LU0I5S1Z4dVhHNGdJQ0FnSUNBZ0lHTmhiR3hpWVdOcktIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdWc1pXMWxiblE2SUdoMGJXd3NYRzRnSUNBZ0lDQWdJQ0FnSUNCaGRIUnlhV0oxZEdVNklHWmhiSE5sTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdZMjl1ZEdWdWREb2dkSEoxWlN4Y2JpQWdJQ0FnSUNBZ0lDQWdJRzFoZEdOb1pYTTZJRzFoZEdOb1pYTXNYRzRnSUNBZ0lDQWdJQ0FnSUNCdGIyTnJkWEE2SUdoMGJXd3VZMnh2Ym1WT2IyUmxLSFJ5ZFdVcElHRnpJRWhVVFV4RmJHVnRaVzUwWEc0Z0lDQWdJQ0FnSUgwcFhHNWNiaUFnSUNCOVhHNWNibHh1SUNBZ0lISmxkSFZ5YmlBa1JFOU5RMjl1ZEdWdWRFOWljMlZ5ZG1WeU8xeHVYRzU5WEc1Y2JseHVYRzVjYmk4cUtseHVJQ29nUld4bGJXVnVkQ0JQWW5ObGNuWmxjbHh1SUNvdlhHNW1kVzVqZEdsdmJpQWtSRTlOVDJKelpYSjJaWElvYUhSdGJEb2dTRlJOVEVWc1pXMWxiblFzSUdOaGJHeGlZV05yT2lBb2NtVmpiM0prT2lCVFpXNXpaVzVVU25WMGMzVlBZbk5sY25abGNsSmxZMjl5WkhNcElEMCtJSFp2YVdRcGUxeHVYRzRnSUNBZ1kyOXVjM1FnWTJocGJHUnlaVzQ2SUVoVVRVeEZiR1Z0Wlc1MFcxMGdQU0JQWW1wbFkzUXVkbUZzZFdWektHaDBiV3d1WTJocGJHUnlaVzRwSUdGeklFaFVUVXhGYkdWdFpXNTBXMTFjYmx4dVhHNGdJQ0FnYVdZb1kyaHBiR1J5Wlc0dWJHVnVaM1JvS1h0Y2JseHVJQ0FnSUNBZ0lDQmphR2xzWkhKbGJpNXRZWEFvWlQwK2UxeHVYRzRnSUNBZ0lDQWdJQ0FnSUNBa1JFOU5RWFIwY21saWRYUmxjMDlpYzJWeWRtVnlLR1VzSUdOaGJHeGlZV05yS1Z4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0FrU2xOUFluTmxjblpsY2lobExDQmpZV3hzWW1GamF5bGNibHh1SUNBZ0lDQWdJQ0FnSUNBZ0pFUlBUVTlpYzJWeWRtVnlLR1VzSUdOaGJHeGlZV05yS1Z4dUlDQWdJQ0FnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJSDBwWEc1Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0JsYkhObGUxeHVYRzRnSUNBZ0lDQWdJQ1JFVDAxRGIyNTBaVzUwVDJKelpYSjJaWElvYUhSdGJDd2dZMkZzYkdKaFkyc3BYRzVjYmlBZ0lDQjlYRzVjYmlBZ0lDQnlaWFIxY200Z0pFUlBUVTlpYzJWeWRtVnlPMXh1WEc1OVhHNWNibHh1WEc1Y2JpOHFLbHh1SUNvZ1QySnpaWEoyWlNCS1V5QkRiMlJsSUdsdUlFVnNaVzFsYm5RZ1hHNGdLaTljYmlCbWRXNWpkR2x2YmlBa1NsTlBZbk5sY25abGNpaG9kRzFzT2lCSVZFMU1SV3hsYldWdWRDd2dZMkZzYkdKaFkyczZJQ2h5WldOdmNtUTZJRk5sYm5ObGJsUktkWFJ6ZFU5aWMyVnlkbVZ5VW1WamIzSmtjeWtnUFQ0Z2RtOXBaQ2w3WEc1Y2JseHVJQ0FnSUdOdmJuTjBJRzFoZEdOb1pYTWdQU0JiTGk0dWFIUnRiQzVwYm01bGNsUmxlSFF1YldGMFkyaEJiR3dvVTNsdWRHRjRUbUYwYVhabFVtVm5SWGh3S1YwN1hHNWNiaUFnSUNCcFppaHRZWFJqYUdWekxteGxibWQwYUNsN1hHNWNiaUFnSUNBZ0lDQWdiV0YwWTJobGN5NXRZWEFvS0cxaGRHTm9MQ0JyS1QwK2V5QnRZWFJqYUdWelcydGRXekZkSUQwZ2JXRjBZMmhsYzF0clhWc3hYUzUwY21sdEtDa2dmU2xjYmx4dUlDQWdJQ0FnSUNCallXeHNZbUZqYXloN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JsYkdWdFpXNTBPaUJvZEcxc0xGeHVJQ0FnSUNBZ0lDQWdJQ0FnYVhOT1lYUnBkbVU2SUhSeWRXVXNYRzRnSUNBZ0lDQWdJQ0FnSUNCdFlYUmphR1Z6T2lCdFlYUmphR1Z6TEZ4dUlDQWdJQ0FnSUNBZ0lDQWdiVzlqYTNWd09pQm9kRzFzTG1Oc2IyNWxUbTlrWlNoMGNuVmxLU0JoY3lCSVZFMU1SV3hsYldWdWRGeHVJQ0FnSUNBZ0lDQjlLVnh1WEc0Z0lDQWdmVnh1WEc0Z0lDQWdjbVYwZFhKdUlDUkVUMDFEYjI1MFpXNTBUMkp6WlhKMlpYSTdYRzVjYm4xY2JseHVYRzVjYmx4dUx5b3FYRzRnS2lCR2FXNWtJRlJ5WVc1ellXTjBhVzl1SUdWNGNISmxjM05wYjI1eklHbHVJRXBUSUVWNGNISmxjM05wYjI1Y2JpQXFMMXh1Wm5WdVkzUnBiMjRnSkVwVFJtbHVaRlJ5WVc1ellXTjBhVzl1Y3p4V1BpaG9kRzFzT2lCSVZFMU1SV3hsYldWdWRDd2dkSEpoYm5OaFkzUnBiMjV6T2lCV0xDQmpZV3hzWW1GamF6b2dLSEpsWTI5eVpEb2dVMlZ1YzJWdVZFcDFkSE4xVDJKelpYSjJaWEpTWldOdmNtUnpLU0E5UGlCMmIybGtLWHRjYmx4dUlDQWdJR2xtS0hSeVlXNXpZV04wYVc5dWN5bDdYRzVjYmlBZ0lDQWdJQ0FnWTI5dWMzUWdKSFJ5WVc1ellXTjBhVzl1Y3lBOUlFOWlhbVZqZEM1bGJuUnlhV1Z6S0hSeVlXNXpZV04wYVc5dWN5azdYRzVjYmlBZ0lDQWdJQ0FnYVdZb0pIUnlZVzV6WVdOMGFXOXVjeTVzWlc1bmRHZ3BlMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQWtkSEpoYm5OaFkzUnBiMjV6TG0xaGNDaGxiblJ5ZVQwK2UxeHVYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMjl1YzNRZ2JXRjBZMmhsY3lBOUlGc3VMaTVUZEdGaWFXeHBlbVZEYjI1MFpXNTBLR2gwYld3dWFXNXVaWEpJVkUxTUtTNXRZWFJqYUVGc2JDaHVaWGNnVW1WblJYaHdLR0FrZXlCbGJuUnllVnN3WFNCOVlDd2dKMmNuS1NsZE8xeHVYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lvYldGMFkyaGxjeTVzWlc1bmRHZ3BlMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDOHZJR052Ym5OdmJHVXVkMkZ5YmlnbkpFcFRSbWx1WkZSeVlXNXpZV04wYVc5dWN5Y3NJR1Z1ZEhKNUxDQnRZWFJqYUdWektWeHVJQ0FnSUNBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHTmhiR3hpWVdOcktIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHVnNaVzFsYm5RNklHaDBiV3dzWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwYzA1aGRHbDJaVG9nZEhKMVpTeGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHTnZiblJsYm5RNklIUnlkV1VzWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J0WVhSamFHVnpPaUJ0WVhSamFHVnpMRnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdiVzlqYTNWd09pQm9kRzFzTG1Oc2IyNWxUbTlrWlNoMGNuVmxLU0JoY3lCSVZFMU1SV3hsYldWdWRGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5S1Z4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCY2JseHVJQ0FnSUNBZ0lDQWdJQ0FnZlNsY2JpQWdJQ0FnSUNBZ0lDQWdJRnh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUZ4dUlDQWdJSDFjYmlBZ0lDQmNibHh1SUNBZ0lISmxkSFZ5YmlBa1NsTkdhVzVrVkhKaGJuTmhZM1JwYjI1ek8xeHVYRzU5WEc1Y2JseHVYRzVjYmk4cUtseHVJQ29nUm5KaFoyMWxiblFnY21WdVpHVnlhVzVuSUdaeWIyMGdVM1J5YVc1blhHNGdLaTljYm1aMWJtTjBhVzl1SUVaeVlXZHRaVzUwVW1WdVpHVnlLR2x1Y0hWME9pQnpkSEpwYm1jc0lHUnBZM1JwYjI1aGNuazZJSHNnVzBzNklITjBjbWx1WjEwZ09pQmhibmtnSUgwZ0tYdGNiaUFnSUNCeVpYUjFjbTRnY21WdVpHVnlLR0FrZXlCcGJuQjFkQ0I5WUN3Z1pHbGpkR2x2Ym1GeWVTd2dlMXh1SUNBZ0lDQWdJQ0JrWld4cGJXbDBaWEk2SUdBa2V5QlRlVVJsZEhJZ2ZXQXNYRzRnSUNBZ0lDQWdJR05zYVdWdWREb2dkSEoxWlZ4dUlDQWdJSDBwWEc1OVhHNWNibHh1WEc1Y2JseHVYRzVjYmk4cUtseHVJQ29nVUdGeWMyVWdUbTlrWlNCdlppQkRiMjF3YjI1bGJuUmNiaUFxTDF4dVpuVnVZM1JwYjI0Z1VHRnljMlZPYjJSbFUzUmhkR1U4Vmo0b1kyOXRjRzl1Wlc1ME9pQlRaVzV6Wlc1S2RYUnpkVHhXUGl3Z2JtOWtaVG9nU0ZSTlRFVnNaVzFsYm5RcGUxeHVYRzRnSUNBZ0pFUlBUVTlpYzJWeWRtVnlLRzV2WkdVc0lDaHlaV052Y21RcFBUNTdYRzVjYmlBZ0lDQWdJQ0FnYVdZb2NtVmpiM0prTG0xaGRHTm9aWE11YkdWdVozUm9LWHRjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdMeThnUUhSekxXbG5ibTl5WlZ4dUlDQWdJQ0FnSUNBZ0lDQWdjbVZqYjNKa0xtVnNaVzFsYm5RdUpHTnZiblJsZUhRZ1BTQmpiMjF3YjI1bGJuUXVKSE4wWVhSbE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnWEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtS0NGeVpXTnZjbVF1YVhOT1lYUnBkbVVwZTF4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtVmpiM0prTG0xaGRHTm9aWE11YldGd0tHMWhkR05vUFQ1N1hHNWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWTI5dWMzUWdhMlY1SUQwZ2JXRjBZMmhiTVYwZ1lYTWdhMlY1YjJZZ1ZqdGNibHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppaHJaWGtnYVc0Z1kyOXRjRzl1Wlc1MExpUjBjbUZ1YzJGamRHbHZibk1wZTF4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCamIyMXdiMjVsYm5RdVVIVnphRkpsWmloclpYa3NJSEpsWTI5eVpDbGNibHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMjl0Y0c5dVpXNTBMbFZ3WjNKaFpHVlVjbUZ1YzJGamRHbHZiaWhyWlhrcFhHNWNibHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnTHk4Z1pXeHpaWHRjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXZMeUFnSUNBZ1kyOXVjMjlzWlM1c2IyY29KMDV2ZENCemRYQndiM0owWldRbkxDQnJaWGtzSUhKbFkyOXlaQ3dnZDJsdVpHOTNMbE4wWVhScFkxTmxibk5sYmtwMWRITjFTVzV6ZEdGdVkyVmJJR052YlhCdmJtVnVkQzRrYzNSaGRHbGpTMlY1SUYwZ0tWeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzh2SUgxY2JseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMHBYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lIMHBYRzRnSUNBZ1hHNTlYRzVjYmx4dVhHNWNibHh1WEc0dktpcGNiaUFxSUNCUVlYSnpaU0JTWldOdmNtUmxaRnh1SUNvdlhHNW1kVzVqZEdsdmJpQlFZWEp6WlZKbFkyOXlaRHhXUGloamIyMXdiMjVsYm5RNklGTmxibk5sYmtwMWRITjFQRlkrTENCeVpXTnZjbVE2SUZObGJuTmxibFJLZFhSemRVOWljMlZ5ZG1WeVVtVmpiM0prY3l3Z2JXRjBZMmc2SUZKbFowVjRjRTFoZEdOb1FYSnlZWGtwZTF4dVhHNGdJQ0FnYVdZb2NtVmpiM0prTG1OdmJuUmxiblFwZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNCeVpXTnZjbVF1Wld4bGJXVnVkQzVwYm01bGNraFVUVXdnUFNCR2NtRm5iV1Z1ZEZKbGJtUmxjaWdvWEc0Z0lDQWdJQ0FnSUNBZ0lDQW9jbVZqYjNKa0xtMXZZMnQxY0Q4dWFXNXVaWEpJVkUxTWZId25KeWxjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0F1Y21Wd2JHRmpaU2h1WlhjZ1VtVm5SWGh3S0cxaGRHTm9XekJkS1N3Z1lEd2tlMU41UkdWMGNuMDlKSHNnYldGMFkyaGJNVjBnZlNSN1UzbEVaWFJ5ZlQ1Z0lDbGNiaUFnSUNBZ0lDQWdLU3dnSUdOdmJYQnZibVZ1ZEM0a2RISmhibk5oWTNScGIyNXpJSHg4SUh0OUlHRnpJRllwWEc1Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0JwWmloeVpXTnZjbVF1WVhSMGNtbGlkWFJsS1h0Y2JseHVJQ0FnSUNBZ0lDQnBaaWh5WldOdmNtUXVZWFIwY21saWRYUmxUbUZ0WlNBcGUxeHVYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpXTnZjbVF1Wld4bGJXVnVkQzV6WlhSQmRIUnlhV0oxZEdVb2NtVmpiM0prTG1GMGRISnBZblYwWlU1aGJXVXNJRVp5WVdkdFpXNTBVbVZ1WkdWeUtDaGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQW9jbVZqYjNKa0xtMXZZMnQxY0Q4dVoyVjBRWFIwY21saWRYUmxLSEpsWTI5eVpDNWhkSFJ5YVdKMWRHVk9ZVzFsS1NCOGZDQW5KeWt1Y21Wd2JHRmpaU2h1WlhjZ1VtVm5SWGh3S0cxaGRHTm9XekJkS1N3Z1lEd2tlMU41UkdWMGNuMDlKSHNnYldGMFkyaGJNVjBnZlNSN1UzbEVaWFJ5ZlQ1Z0lDbGNiaUFnSUNBZ0lDQWdJQ0FnSUNrc0lDQmpiMjF3YjI1bGJuUXVKSFJ5WVc1ellXTjBhVzl1Y3lCOGZDQjdmU0JoY3lCV0tTQXBYRzVjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCY2JpQWdJQ0I5WEc1Y2JpQWdJQ0J5WlhSMWNtNGdVR0Z5YzJWU1pXTnZjbVE3WEc0Z0lDQWdYRzU5WEc1Y2JseHVYRzVjYmx4dVhHNWNibVoxYm1OMGFXOXVJRk4wWVdKcGJHbDZaVU52Ym5SbGJuUW9ZMjl1ZEdWdWREb2djM1J5YVc1bktTQTZJSE4wY21sdVozdGNiaUFnSUNCeVpYUjFjbTRnS0dOdmJuUmxiblI4ZkNjbktTNXlaWEJzWVdObEtDOG1aM1E3TDJjc0lHQStZQ2t1Y21Wd2JHRmpaU2d2Sm14ME95OW5MQ0JnUEdBcFhHNTlYRzVjYmx4dVhHNWNibHh1WEc1Y2JtTnNZWE56SUZObGJuTmxia3AxZEhOMVBGWWdaWGgwWlc1a2N5QjdJRnRMT2lCemRISnBibWRkSURvZ1lXNTVMQ0FrWTI5dWRHVjRkRDg2SUZZZ2ZUNTdYRzVjYmx4dUlDQWdJQ1J6ZEdGMGFXTkxaWGs2SUc1MWJXSmxjaUE5SURBN1hHNWNiaUFnSUNBa1pXeGxiV1Z1ZEQ4NklFaFVUVXhGYkdWdFpXNTBJSHdnYm5Wc2JDQTlJR1J2WTNWdFpXNTBMbUp2WkhrN1hHNWNiaUFnSUNBa1puSnZiVk4wY21sdVp6ODZJSE4wY21sdVp6dGNibHh1SUNBZ0lDUjJhWEowZFdGc2FYcGhkR2x2YmpvZ1JHOWpkVzFsYm5RZ2ZDQnVkV3hzSUQwZ2JuVnNiRHRjYmx4dUlDQWdJQ1IwY21GdWMyRmpkR2x2Ym5NNklGWWdQU0I3ZlNCaGN5QldPMXh1WEc0Z0lDQWdKSE4wWVhSbE9pQldJRDBnZTMwZ1lYTWdWanRjYmx4dUlDQWdJQ1J5Wldaek9pQjdJRnRTWlNCcGJpQnJaWGx2WmlCV1hTQS9PaUJCY25KaGVUeFRaVzV6Wlc1VVNuVjBjM1ZQWW5ObGNuWmxjbEpsWTI5eVpITStJSDBnUFNCN2ZUdGNibHh1SUNBZ0lDOHZJQ01rY0hKdmNITWdPaUJUWlc1elpXNVVTblYwYzNWUWNtOXdjenhXUGlBOUlIdDlJR0Z6SUZObGJuTmxibFJLZFhSemRWQnliM0J6UEZZK1hHNGdJQ0FnWEc1Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCT1pYY2dRMjl1YzNSeWRXTjBYRzRnSUNBZ0lDb3ZYRzRnSUNBZ1kyOXVjM1J5ZFdOMGIzSW9jSEp2Y0hNNklGTmxibk5sYmxSS2RYUnpkVkJ5YjNCelBGWStLWHRjYmx4dUlDQWdJQ0FnSUNBdkx5QjBhR2x6TG5CeWIzQnpJRDBnY0hKdmNITTdYRzVjYmlBZ0lDQWdJQ0FnZEdocGN5NUpibWwwS0hCeWIzQnpLUzVUZEdGMFpYTW9LUzVTWlc1a1pYSW9LVHRjYmx4dUlDQWdJSDFjYmx4dUlDQWdJRWx1YVhRb2NISnZjSE02SUZObGJuTmxibFJLZFhSemRWQnliM0J6UEZZK0tYdGNibHh1SUNBZ0lDQWdJQ0F2THlCMGFHbHpMaU1rY0hKdmNITWdQU0J3Y205d2N6dGNibHh1SUNBZ0lDQWdJQ0IwYUdsekxpUmxiR1Z0Wlc1MElEMGdLSEJ5YjNCekxtVnNaVzFsYm5RZ2FXNXpkR0Z1WTJWdlppQklWRTFNUld4bGJXVnVkQ2tnWEc0Z0lDQWdJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdJQ0FnSUQ4Z2NISnZjSE11Wld4bGJXVnVkQ0JjYmlBZ0lDQWdJQ0FnSUNBZ0lGeHVJQ0FnSUNBZ0lDQWdJQ0FnT2lBb1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RIbHdaVzltSUhCeWIzQnpMbVZzWlcxbGJuUWdQVDBnSjNOMGNtbHVaeWNnWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lEOGdaRzlqZFcxbGJuUXVjWFZsY25sVFpXeGxZM1J2Y2loZ0pIc2djSEp2Y0hNdVpXeGxiV1Z1ZENCOVlDa2dYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQTZJRzUxYkd4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJQ0FnSUNBcFhHNWNiaUFnSUNBZ0lDQWdkR2hwY3k0a2RISmhibk5oWTNScGIyNXpJRDBnY0hKdmNITXVkSEpoYm5OaFkzUnBiMjV6SUh4OElIdDlJR0Z6SUZZN1hHNWNiaUFnSUNBZ0lDQWdkR2hwY3k0a2MzUmhkR1VnUFNCUFltcGxZM1F1WVhOemFXZHVLSHQ5TENCMGFHbHpMaVIwY21GdWMyRmpkR2x2Ym5NcFhHNWNibHh1SUNBZ0lDQWdJQ0IzYVc1a2IzY3VVM1JoZEdsalUyVnVjMlZ1U25WMGMzVkpibk4wWVc1alpTQTlJSGRwYm1SdmR5NVRkR0YwYVdOVFpXNXpaVzVLZFhSemRVbHVjM1JoYm1ObElIeDhJRnRkWEc0Z0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNCMGFHbHpMaVJ6ZEdGMGFXTkxaWGtnUFNCM2FXNWtiM2N1VTNSaGRHbGpVMlZ1YzJWdVNuVjBjM1ZKYm5OMFlXNWpaUzVzWlc1bmRHZzdYRzVjYmlBZ0lDQWdJQ0FnZDJsdVpHOTNMbE4wWVhScFkxTmxibk5sYmtwMWRITjFTVzV6ZEdGdVkyVmJJSFJvYVhNdUpITjBZWFJwWTB0bGVTQmRJRDBnZEdocGMxeHVYRzVjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJSFJvYVhNN1hHNWNiaUFnSUNCOVhHNWNibHh1WEc1Y2JseHVJQ0FnSUZWd1ozSmhaR1ZVY21GdWMyRmpkR2x2YmloclpYa2dPaUJyWlhsdlppQldLWHRjYmx4dVhHNGdJQ0FnSUNBZ0lHbG1LR3RsZVNCcGJpQjBhR2x6TGlSeVpXWnpLWHRjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdZMjl1YzNRZ2NtVmpiM0prY3lBOUlIUm9hWE11SkhKbFpuTmJJR3RsZVNCZE8xeHVYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpXTnZjbVJ6UHk1dFlYQW9jbVZqYjNKa1BUNTdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmloeVpXTnZjbVFwZTF4dUlDQWdJQ0FnSUNCY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjbVZqYjNKa0xtMWhkR05vWlhNdWJXRndLRzFoZEdOb1BUNTdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtS0NGeVpXTnZjbVF1YVhOT1lYUnBkbVVwZTF4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdVR0Z5YzJWU1pXTnZjbVE4Vmo0b2RHaHBjeXdnY21WamIzSmtMQ0J0WVhSamFDazdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWld4elpYdGNibHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUtISmxZMjl5WkM1amIyNTBaVzUwS1h0Y2JseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCamIyNXpkQ0JqYjIxd2RYUmxaQ0E5SUVaeVlXZHRaVzUwVW1WdVpHVnlLRk4wWVdKcGJHbDZaVU52Ym5SbGJuUW9jbVZqYjNKa0xtMXZZMnQxY0Q4dWFXNXVaWEpJVkUxTWZId25KeWtzSUhSb2FYTXVKSFJ5WVc1ellXTjBhVzl1Y3lrN1hHNWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtVmpiM0prTG1Wc1pXMWxiblF1YVc1dVpYSklWRTFNSUQwZ1kyOXRjSFYwWldSY2JseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBa1JFOU5UMkp6WlhKMlpYSW9jbVZqYjNKa0xtVnNaVzFsYm5Rc0lDaHlaV01wUFQ1N1hHNWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtS0hKbFl5NXRZWFJqYUdWekxteGxibWQwYUNsN1hHNWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCUFltcGxZM1F1ZG1Gc2RXVnpLSEpsWXk1dFlYUmphR1Z6S1M1dFlYQW9iV0YwUFQ1N1hHNWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1UWRYTm9VbVZtS0cxaGRGc3hYU3dnY21WaktWeHVYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRkJoY25ObFVtVmpiM0prUEZZK0tIUm9hWE1zSUhKbFl5d2diV0YwS1R0Y2JseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgwcFhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOVhHNWNibHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlLVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmNibHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlLVnh1SUNBZ0lDQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lGeHVJQ0FnSUNBZ0lDQWdJQ0FnZlNsY2JpQWdJQ0JjYmlBZ0lDQWdJQ0FnSUNBZ0lGeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJRnh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdkR2hwY3p0Y2JpQWdJQ0FnSUNBZ1hHNGdJQ0FnZlZ4dVhHNWNibHh1WEc1Y2JpQWdJQ0JUZEdGMFpYTW9LWHRjYmx4dUlDQWdJQ0FnSUNCcFppaDBhR2x6TGlSemRHRjBaU2w3WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJR052Ym5OMElDUmZjM1JoZEdWeklEMGdUMkpxWldOMExtVnVkSEpwWlhNb2RHaHBjeTRrYzNSaGRHVXBPMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQmNibHh1SUNBZ0lDQWdJQ0FnSUNBZ0x5b3FYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0tpQlRkR0YwWlhOY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FxTDF4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lvSkY5emRHRjBaWE11YkdWdVozUm9LWHRjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdOdmJuTjBJSE5sYkdZZ1BTQjBhR2x6TzF4dVhHNGdJQ0FnWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnTHlvcVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDb2dVSEpsTFVKMWFXeGtJRk4wWVhSbGMxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXFMMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ1JmYzNSaGRHVnpMbTFoY0NobFBUNTdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWW9kSGx3Wlc5bUlHVmJNVjBnUFQwZ0ozTjBjbWx1WnljcGUxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCamIyNXpkQ0J1WVcxbElEMGdaVnN3WFNCaGN5QnJaWGx2WmlCV08xeHVYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmpiMjV6ZENCbWFXNWtaWElnUFNCYkxpNHVaVnN4WFM1dFlYUmphRUZzYkNoVGVXNTBZWGhXWVhKcFlXSnNaWE5TWldkRmVIQXBYVnh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmlobWFXNWtaWEl1YkdWdVozUm9LWHRjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHWnBibVJsY2k1dFlYQW9abTkxYm1ROVBudGNibHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQm1iM1Z1WkZzeFhTQTlJR1p2ZFc1a1d6RmRMblJ5YVcwb0tWeHVYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11SkhSeVlXNXpZV04wYVc5dWMxc2dibUZ0WlNCZElEMGdaVnN4WFM1eVpYQnNZV05sS0c1bGR5QlNaV2RGZUhBb1lDUjdJR1p2ZFc1a1d6QmRJSDFnS1N3Z2RHaHBjeTRrYzNSaGRHVmJJR1p2ZFc1a1d6RmRJRjBwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOUtWeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh1WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOUtWeHVYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdMeW9xWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNvZ1FuVnBiR1FnVTNSaGRHVnpYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ292WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWTI5dWMzUWdKSE4wWVhSbGN5QTlJRTlpYW1WamRDNWxiblJ5YVdWektIUm9hWE11SkhOMFlYUmxLVHRjYmlBZ0lDQmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWtjM1JoZEdWekxtMWhjQ2hsUFQ1N1hHNWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWTI5dWMzUWdibUZ0WlNBOUlHVmJNRjBnWVhNZ2EyVjViMllnVmp0Y2JseHVYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUM4cUtseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnS2lCUFltcGxZM1J6WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXFMMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppaDBlWEJsYjJZZ1pWc3hYU0E5UFNBbmIySnFaV04wSnlsN1hHNWNibHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdMeW9xWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnS2lCSmN5QkJjbkpoZVZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNvdlhHNWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1LRUZ5Y21GNUxtbHpRWEp5WVhrb1pWc3hYU2twZTF4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k0a2MzUmhkR1ZiSUc1aGJXVWdYU0E5SUc1bGR5QlFjbTk0ZVR4MGVYQmxiMllnWlZzeFhUNG9aVnN4WFN3Z2UxeHVJQ0FnSUZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J6WlhRb2RHRnlaMlYwTENCd2NtOXdMQ0J5WldObGFYWmxLWHRjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWW9kSGx3Wlc5bUlIUmhjbWRsZEZ0d2NtOXdYU0E5UFNBblpuVnVZM1JwYjI0bktYdGNibHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDZ29LVDArZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCamIyNXpiMnhsTG5kaGNtNG9KMU5GVkNCTlQxWkZJRmRwZEdnZ1JuVnVZM1JwYjI0bkxDQndjbTl3S1Z4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnZEdGeVoyVjBXM0J5YjNCZFhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlNrdVlYQndiSGtvZEdGeVoyVjBMQ0IwZVhCbGIyWWdjbVZqWldsMlpTQTlQU0FuYjJKcVpXTjBKeUEvSUhKbFkyVnBkbVVnT2lCYmNtVmpaV2wyWlYwcFhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1ZzYzJWN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkR0Z5WjJWMFczQnliM0JkSUQwZ2NtVmpaV2wyWlZ4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpaV3htTGlSMGNtRnVjMkZqZEdsdmJuTmJJRzVoYldVZ1hTQTlJSFJoY21kbGRGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpaV3htTGxWd1ozSmhaR1ZVY21GdWMyRmpkR2x2YmlnZ2JtRnRaU0FwWEc0Z0lDQWdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdkSEoxWlR0Y2JpQWdJQ0JjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5S1Z4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k0a2RISmhibk5oWTNScGIyNXpXeUJ1WVcxbElGMGdQU0IwYUdsekxpUnpkR0YwWlZzZ2JtRnRaU0JkWEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjBhR2x6TGlSemRHRjBaVnNnYm1GdFpTQmRXekJkSUQwZ0tDZFVaWE4wYjI0bktWeHVYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjYmx4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbGJITmxlMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1kyOXVjMjlzWlM1M1lYSnVLQ2RUZEdGMFpTQnZaaUJQWW1wbFkzUW5MQ0JsS1Z4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JsYkhObGUxeHVYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQlBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvZEdocGN5NGtjM1JoZEdVc0lHQWtleUJ1WVcxbElIMWdMQ0I3WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQm5aWFE2SUdaMWJtTjBhVzl1S0NsN0lISmxkSFZ5YmlCelpXeG1MaVIwY21GdWMyRmpkR2x2Ym5OYklHNWhiV1VnWFRzZ2ZTeGNiaUFnSUNCY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpaWFE2SUdaMWJtTjBhVzl1S0haaGJIVmxLWHRjYmlBZ0lDQmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2MyVnNaaTRrZEhKaGJuTmhZM1JwYjI1eld5QnVZVzFsSUYwZ1BTQjJZV3gxWlZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjMlZzWmk1VmNHZHlZV1JsVkhKaGJuTmhZM1JwYjI0b0lHNWhiV1VnS1Z4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOUxGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZTbGNiaUFnSUNCY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh1WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOUtWeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lGeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJSDFjYmx4dVhHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCMGFHbHpPMXh1SUNBZ0lDQWdJQ0JjYmlBZ0lDQjlYRzRnSUNBZ1hHNWNibHh1SUNBZ0lGQjFjMmhTWldZb2EyVjVPaUJyWlhsdlppQldMQ0J5WldOdmNtUTZJRk5sYm5ObGJsUktkWFJ6ZFU5aWMyVnlkbVZ5VW1WamIzSmtjeWw3WEc1Y2JpQWdJQ0FnSUNBZ2RHaHBjeTRrY21WbWMxc2dhMlY1SUYwZ1BTQjBhR2x6TGlSeVpXWnpXeUJyWlhrZ1hTQjhmQ0JiWFR0Y2JseHVJQ0FnSUNBZ0lDQjBhR2x6TGlSeVpXWnpXeUJyWlhrZ1hUOHVjSFZ6YUNoeVpXTnZjbVFwWEc1Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUhSb2FYTTdYRzRnSUNBZ0lDQWdJRnh1SUNBZ0lIMWNiaUFnSUNCY2JseHVYRzVjYmlBZ0lDQmNibHh1SUNBZ0lGeHVYRzRnSUNBZ1VtVnVaR1Z5S0NsN1hHNWNibHh1SUNBZ0lDQWdJQ0JwWmloMGFHbHpMaVJsYkdWdFpXNTBJR2x1YzNSaGJtTmxiMllnU0ZSTlRFVnNaVzFsYm5RcGUxeHVYRzRnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMaVIyYVhKMGRXRnNhWHBoZEdsdmJpQTlJQ2h1WlhjZ1JFOU5VR0Z5YzJWeUtDa3BMbkJoY25ObFJuSnZiVk4wY21sdVp5aDBhR2x6TGlSbGJHVnRaVzUwTG1sdWJtVnlTRlJOVEN3Z0ozUmxlSFF2YUhSdGJDY3BYRzVjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdMeW9xWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdLaUJVY21GcGRHVnRaVzUwSUdSbGN5QmxlSEJ5WlhOemFXOXVjeUJPWVhScGRtVmNiaUFnSUNBZ0lDQWdJQ0FnSUNBcUwxeHVYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0pFUlBUVTlpYzJWeWRtVnlLSFJvYVhNdUpIWnBjblIxWVd4cGVtRjBhVzl1TG1KdlpIa3NJQ2h5WldOdmNtUXBQVDU3WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppaHlaV052Y21RdWJXRjBZMmhsY3k1c1pXNW5kR2dwZTF4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzh2SUVCMGN5MXBaMjV2Y21WY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjbVZqYjNKa0xtVnNaVzFsYm5RdUpHTnZiblJsZUhRZ1BTQjBhR2x6TGlSemRHRjBaVHRjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBaaWh5WldOdmNtUXVhWE5PWVhScGRtVXBlMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmloeVpXTnZjbVF1YldGMFkyaGxjeWw3WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnlaV052Y21RdWJXRjBZMmhsY3k1dFlYQW9iV0YwWTJnOVBudGNibHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnlaV052Y21RdVpXeGxiV1Z1ZEM1cGJtNWxja2hVVFV3Z1BTQW9VM1JoWW1sc2FYcGxRMjl1ZEdWdWRDaHlaV052Y21RdVpXeGxiV1Z1ZEM1cGJtNWxja2hVVFV4OGZDY25LUzV5WlhCc1lXTmxLRzFoZEdOb1d6QmRMQ0JnUENSN1UzbEVaWFJ5ZlNSN0lHMWhkR05vV3pGZElIMGtlMU41UkdWMGNuMCtZQ2twWEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlLVnh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0pFcFRSbWx1WkZSeVlXNXpZV04wYVc5dWN6eFdQaWh5WldOdmNtUXVaV3hsYldWdWRDd2dkR2hwY3k0a2RISmhibk5oWTNScGIyNXpMQ0FvY21WaktUMCtlMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtS0hKbFl5NXBjMDVoZEdsMlpTbDdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUtISmxZeTV0WVhSamFHVnpMbXhsYm1kMGFDbDdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnlaV011YldGMFkyaGxjeTV0WVhBb2JXRjBQVDU3WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTVRZFhOb1VtVm1LRzFoZEZzd1hTQmhjeUJyWlhsdlppQldMQ0J5WldNcFhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgwcFhHNWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlLVnh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RISjVlMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEpsWTI5eVpDNWxiR1Z0Wlc1MExtbHVibVZ5U0ZSTlRDQTlJR0FrZXlCR2NtRm5iV1Z1ZEZKbGJtUmxjaWhUZEdGaWFXeHBlbVZEYjI1MFpXNTBLSEpsWTI5eVpDNWxiR1Z0Wlc1MExtbHVibVZ5U0ZSTlRIeDhKeWNwTENCMGFHbHpMaVIwY21GdWMyRmpkR2x2Ym5NcElIMWdYRzRnSUNBZ1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmV05oZEdOb0tHVXBlMXh1SUNBZ0lGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCamIyNXpiMnhsTG14dlp5Z25SWEp5YjNJZ1pHVjBaV04wWldRbkxDQmxLVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOVhHNWNibHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdmU2s3WEc1Y2JseHVYRzRnSUNBZ0lDQWdJQ0FnSUNBdktpcGNiaUFnSUNBZ0lDQWdJQ0FnSUNBcUlGUnlZV2wwWlcxbGJuUWdaR1Z6SUhSeVlXNXpZV04wYVc5dWMxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNvdlhHNWNiaUFnSUNBZ0lDQWdJQ0FnSUZCaGNuTmxUbTlrWlZOMFlYUmxQRlkrS0hSb2FYTXNJSFJvYVhNdUpIWnBjblIxWVd4cGVtRjBhVzl1TG1KdlpIa3BYRzVjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdMeW9xWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdLaUJOYVhObElNT2dJR3B2ZFhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FxTDF4dUlDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k0a1pXeGxiV1Z1ZEM1cGJtNWxja2hVVFV3Z1BTQW5KenRjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdZMjl1YzNRZ1kyaHBiR1J5Wlc0Z1BTQlBZbXBsWTNRdWRtRnNkV1Z6S0NCMGFHbHpMaVIyYVhKMGRXRnNhWHBoZEdsdmJpNWliMlI1TG1Ob2FXeGtjbVZ1SUNrN1hHNWNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUtHTm9hV3hrY21WdUxteGxibWQwYUNsN1hHNWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmphR2xzWkhKbGJpNXRZWEFvWTJocGJHUWdQVDRnZTF4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdUpHVnNaVzFsYm5RL0xtRndjR1Z1WkVOb2FXeGtLR05vYVd4a0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlNsY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCY2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JjYmlBZ0lDQWdJQ0FnZlZ4dVhHNWNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlIUm9hWE03WEc0Z0lDQWdJQ0FnSUZ4dUlDQWdJSDFjYmx4dWZWeHVYRzVjYmx4dVhHNWNibHh1Wlhod2IzSjBJR1JsWm1GMWJIUWdVMlZ1YzJWdVNuVjBjM1ZjYmx4dUlsMTkiLCJpbXBvcnQgU2Vuc2VuSnV0c3UgZnJvbSBcIi4vaW5kZXhcIjtcbmNvbnN0IHZtID0gbmV3IFNlbnNlbkp1dHN1KHtcbiAgICBlbGVtZW50OiAnI2FwcCcsXG4gICAgdHJhbnNhY3Rpb25zOiB7XG4gICAgICAgIHRpdGxlOiAnSGVsbG8gbGVzIGdlbnMnLFxuICAgICAgICBtZXNzYWdlOiAnTG9yZW0gaXBzdW0ge3sgY291bnRlciB9fScsXG4gICAgICAgIHJvdXRlOiAnY29taW5nc29vbicsXG4gICAgICAgIGNvdW50ZXI6IDAsXG4gICAgICAgIHBlcnNvbnM6IFtcbiAgICAgICAgICAgICdZYW5uJyxcbiAgICAgICAgICAgICdDaHJpc3RpbmEnLFxuICAgICAgICAgICAgJ015YW5hJyxcbiAgICAgICAgICAgICdTeWFuYSdcbiAgICAgICAgXSxcbiAgICAgICAgLy8gcGVyc29uczogbmV3IFByb3h5PHN0cmluZ1tdPihbXG4gICAgICAgIC8vICAgICAnWWFubicsXG4gICAgICAgIC8vICAgICAnQ2hyaXN0aW5hJyxcbiAgICAgICAgLy8gICAgICdNeWFuYScsXG4gICAgICAgIC8vICAgICAnU3lhbmEnXG4gICAgICAgIC8vIF0sIHtcbiAgICAgICAgLy8gICAgIGdldCh0LHAscil7XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coJ0dFVCBTVEFURScsIHQsIHAsIHIpXG4gICAgICAgIC8vICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRbcF1cbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICBzZXQodCxwLHIpe1xuICAgICAgICAvLyAgICAgICAgIHRbcF0gPSByXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS53YXJuKCdTRVQgU1RBVEUnLCB0LCBwLCByKVxuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pLFxuICAgICAgICBpbmNyZW1lbnQoKSB7XG4gICAgICAgICAgICB0aGlzLnBlcnNvbnNbMV0gPSAoJ0lhbkNhcnRlciBOb3cnKTtcbiAgICAgICAgICAgIHRoaXMuY291bnRlcisrO1xuICAgICAgICAgICAgLy8gdGhpcy5tZXNzYWdlID0gYFdlIGNvdW50IHRvICR7IHRoaXMuY291bnRlciB9YFxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0luY3JlbWVudCcsIHRoaXMuY291bnRlciwgdGhpcy5wZXJzb25zKTtcbiAgICAgICAgfVxuICAgIH0sXG59KTtcbmNvbnNvbGUud2FybignVk0nLCB2bSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lkR1Z6ZEM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1TDJOdmNtVXZkR1Z6ZEM1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaVFVRkJRU3hQUVVGUExGZEJRVmNzVFVGQlRTeFRRVUZUTEVOQlFVTTdRVUZIYkVNc1RVRkJUU3hGUVVGRkxFZEJRVWNzU1VGQlNTeFhRVUZYTEVOQlFVTTdTVUZGZGtJc1QwRkJUeXhGUVVGRkxFMUJRVTA3U1VGRlppeFpRVUZaTEVWQlFVTTdVVUZGVkN4TFFVRkxMRVZCUVVVc1owSkJRV2RDTzFGQlJYWkNMRTlCUVU4c1JVRkJSU3d5UWtGQk1rSTdVVUZGY0VNc1MwRkJTeXhGUVVGRkxGbEJRVms3VVVGRmJrSXNUMEZCVHl4RlFVRkZMRU5CUVVNN1VVRkZWaXhQUVVGUExFVkJRVVU3V1VGRFRDeE5RVUZOTzFsQlEwNHNWMEZCVnp0WlFVTllMRTlCUVU4N1dVRkRVQ3hQUVVGUE8xTkJRMVk3VVVGSFJDeHBRMEZCYVVNN1VVRkRha01zWTBGQll6dFJRVU5rTEcxQ1FVRnRRanRSUVVOdVFpeGxRVUZsTzFGQlEyWXNZMEZCWXp0UlFVTmtMRTlCUVU4N1VVRkRVQ3hyUWtGQmEwSTdVVUZGYkVJc05FTkJRVFJETzFGQlJUVkRMSFZDUVVGMVFqdFJRVU4yUWl4elFrRkJjMEk3VVVGRGRFSXNVMEZCVXp0UlFVTlVMR3RDUVVGclFqdFJRVVZzUWl4dFFrRkJiVUk3VVVGRmJrSXNOa05CUVRaRE8xRkJSVGRETEhOQ1FVRnpRanRSUVVOMFFpeFJRVUZSTzFGQlExSXNUVUZCVFR0UlFVVk9MRk5CUVZNN1dVRkZUQ3hKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1pVRkJaU3hEUVVGRExFTkJRVUU3V1VGRmJrTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRE8xbEJSV1lzYVVSQlFXbEVPMWxCUldwRUxFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNWMEZCVnl4RlFVRkZMRWxCUVVrc1EwRkJReXhQUVVGUExFVkJRVVVzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUlN4RFFVRkJPMUZCUlhwRUxFTkJRVU03UzBGRlNqdERRVWRLTEVOQlFVTXNRMEZCUVR0QlFVVkdMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkJJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpYVcxd2IzSjBJRk5sYm5ObGJrcDFkSE4xSUdaeWIyMGdYQ0l1TDJsdVpHVjRYQ0k3WEc1Y2JseHVZMjl1YzNRZ2RtMGdQU0J1WlhjZ1UyVnVjMlZ1U25WMGMzVW9lMXh1WEc0Z0lDQWdaV3hsYldWdWREb2dKeU5oY0hBbkxGeHVYRzRnSUNBZ2RISmhibk5oWTNScGIyNXpPbnRjYmx4dUlDQWdJQ0FnSUNCMGFYUnNaVG9nSjBobGJHeHZJR3hsY3lCblpXNXpKeXhjYmx4dUlDQWdJQ0FnSUNCdFpYTnpZV2RsT2lBblRHOXlaVzBnYVhCemRXMGdlM3NnWTI5MWJuUmxjaUI5ZlNjc1hHNWNiaUFnSUNBZ0lDQWdjbTkxZEdVNklDZGpiMjFwYm1kemIyOXVKeXhjYmx4dUlDQWdJQ0FnSUNCamIzVnVkR1Z5T2lBd0xGeHVYRzRnSUNBZ0lDQWdJSEJsY25OdmJuTTZJRnRjYmlBZ0lDQWdJQ0FnSUNBZ0lDZFpZVzV1Snl4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ2REYUhKcGMzUnBibUVuTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdKMDE1WVc1aEp5eGNiaUFnSUNBZ0lDQWdJQ0FnSUNkVGVXRnVZU2RjYmlBZ0lDQWdJQ0FnWFN4Y2JpQWdJQ0FnSUNBZ1hHNWNiaUFnSUNBZ0lDQWdMeThnY0dWeWMyOXVjem9nYm1WM0lGQnliM2g1UEhOMGNtbHVaMXRkUGloYlhHNGdJQ0FnSUNBZ0lDOHZJQ0FnSUNBbldXRnViaWNzWEc0Z0lDQWdJQ0FnSUM4dklDQWdJQ0FuUTJoeWFYTjBhVzVoSnl4Y2JpQWdJQ0FnSUNBZ0x5OGdJQ0FnSUNkTmVXRnVZU2NzWEc0Z0lDQWdJQ0FnSUM4dklDQWdJQ0FuVTNsaGJtRW5YRzRnSUNBZ0lDQWdJQzh2SUYwc0lIdGNiaUFnSUNBZ0lDQWdMeThnSUNBZ0lHZGxkQ2gwTEhBc2NpbDdYRzVjYmlBZ0lDQWdJQ0FnTHk4Z0lDQWdJQ0FnSUNCamIyNXpiMnhsTG14dlp5Z25SMFZVSUZOVVFWUkZKeXdnZEN3Z2NDd2djaWxjYmx4dUlDQWdJQ0FnSUNBdkx5QWdJQ0FnSUNBZ0lDOHZRSFJ6TFdsbmJtOXlaVnh1SUNBZ0lDQWdJQ0F2THlBZ0lDQWdJQ0FnSUhKbGRIVnliaUIwVzNCZFhHNGdJQ0FnSUNBZ0lDOHZJQ0FnSUNCOUxGeHVJQ0FnSUNBZ0lDQXZMeUFnSUNBZ2MyVjBLSFFzY0N4eUtYdGNibHh1SUNBZ0lDQWdJQ0F2THlBZ0lDQWdJQ0FnSUhSYmNGMGdQU0J5WEc1Y2JpQWdJQ0FnSUNBZ0x5OGdJQ0FnSUNBZ0lDQmpiMjV6YjJ4bExuZGhjbTRvSjFORlZDQlRWRUZVUlNjc0lIUXNJSEFzSUhJcFhHNWNiaUFnSUNBZ0lDQWdMeThnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdkSEoxWlZ4dUlDQWdJQ0FnSUNBdkx5QWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBdkx5QjlLU3hjYmlBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUdsdVkzSmxiV1Z1ZENncElEb2dkbTlwWkh0Y2JseHVJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NXdaWEp6YjI1eld6RmRJRDBnS0NkSllXNURZWEowWlhJZ1RtOTNKeWxjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1amIzVnVkR1Z5S3lzN1hHNWNiaUFnSUNBZ0lDQWdJQ0FnSUM4dklIUm9hWE11YldWemMyRm5aU0E5SUdCWFpTQmpiM1Z1ZENCMGJ5QWtleUIwYUdsekxtTnZkVzUwWlhJZ2ZXQmNiaUFnSUNBZ0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNBZ0lDQWdZMjl1YzI5c1pTNXNiMmNvSjBsdVkzSmxiV1Z1ZENjc0lIUm9hWE11WTI5MWJuUmxjaXdnZEdocGN5NXdaWEp6YjI1eklDbGNiaUFnSUNBZ0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lGeHVJQ0FnSUgwc1hHNWNibHh1ZlNsY2JseHVZMjl1YzI5c1pTNTNZWEp1S0NkV1RTY3NJSFp0S1NKZGZRPT0iLCIvKlxuICogRUpTIEVtYmVkZGVkIEphdmFTY3JpcHQgdGVtcGxhdGVzXG4gKiBDb3B5cmlnaHQgMjExMiBNYXR0aGV3IEVlcm5pc3NlIChtZGVAZmxlZWdpeC5vcmcpXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQGZpbGUgRW1iZWRkZWQgSmF2YVNjcmlwdCB0ZW1wbGF0aW5nIGVuZ2luZS4ge0BsaW5rIGh0dHA6Ly9lanMuY299XG4gKiBAYXV0aG9yIE1hdHRoZXcgRWVybmlzc2UgPG1kZUBmbGVlZ2l4Lm9yZz5cbiAqIEBhdXRob3IgVGlhbmNoZW5nIFwiVGltb3RoeVwiIEd1IDx0aW1vdGh5Z3U5OUBnbWFpbC5jb20+XG4gKiBAcHJvamVjdCBFSlNcbiAqIEBsaWNlbnNlIHtAbGluayBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjAgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wfVxuICovXG5cbi8qKlxuICogRUpTIGludGVybmFsIGZ1bmN0aW9ucy5cbiAqXG4gKiBUZWNobmljYWxseSB0aGlzIFwibW9kdWxlXCIgbGllcyBpbiB0aGUgc2FtZSBmaWxlIGFzIHtAbGluayBtb2R1bGU6ZWpzfSwgZm9yXG4gKiB0aGUgc2FrZSBvZiBvcmdhbml6YXRpb24gYWxsIHRoZSBwcml2YXRlIGZ1bmN0aW9ucyByZSBncm91cGVkIGludG8gdGhpc1xuICogbW9kdWxlLlxuICpcbiAqIEBtb2R1bGUgZWpzLWludGVybmFsXG4gKiBAcHJpdmF0ZVxuICovXG5cbi8qKlxuICogRW1iZWRkZWQgSmF2YVNjcmlwdCB0ZW1wbGF0aW5nIGVuZ2luZS5cbiAqXG4gKiBAbW9kdWxlIGVqc1xuICogQHB1YmxpY1xuICovXG5cbnZhciBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG52YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxudmFyIHNjb3BlT3B0aW9uV2FybmVkID0gZmFsc2U7XG4vKiogQHR5cGUge3N0cmluZ30gKi9cbnZhciBfVkVSU0lPTl9TVFJJTkcgPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKS52ZXJzaW9uO1xudmFyIF9ERUZBVUxUX09QRU5fREVMSU1JVEVSID0gJzwnO1xudmFyIF9ERUZBVUxUX0NMT1NFX0RFTElNSVRFUiA9ICc+JztcbnZhciBfREVGQVVMVF9ERUxJTUlURVIgPSAnJSc7XG52YXIgX0RFRkFVTFRfTE9DQUxTX05BTUUgPSAnbG9jYWxzJztcbnZhciBfTkFNRSA9ICdlanMnO1xudmFyIF9SRUdFWF9TVFJJTkcgPSAnKDwlJXwlJT58PCU9fDwlLXw8JV98PCUjfDwlfCU+fC0lPnxfJT4pJztcbnZhciBfT1BUU19QQVNTQUJMRV9XSVRIX0RBVEEgPSBbJ2RlbGltaXRlcicsICdzY29wZScsICdjb250ZXh0JywgJ2RlYnVnJywgJ2NvbXBpbGVEZWJ1ZycsXG4gICdjbGllbnQnLCAnX3dpdGgnLCAncm1XaGl0ZXNwYWNlJywgJ3N0cmljdCcsICdmaWxlbmFtZScsICdhc3luYyddO1xuLy8gV2UgZG9uJ3QgYWxsb3cgJ2NhY2hlJyBvcHRpb24gdG8gYmUgcGFzc2VkIGluIHRoZSBkYXRhIG9iaiBmb3Jcbi8vIHRoZSBub3JtYWwgYHJlbmRlcmAgY2FsbCwgYnV0IHRoaXMgaXMgd2hlcmUgRXhwcmVzcyAyICYgMyBwdXQgaXRcbi8vIHNvIHdlIG1ha2UgYW4gZXhjZXB0aW9uIGZvciBgcmVuZGVyRmlsZWBcbnZhciBfT1BUU19QQVNTQUJMRV9XSVRIX0RBVEFfRVhQUkVTUyA9IF9PUFRTX1BBU1NBQkxFX1dJVEhfREFUQS5jb25jYXQoJ2NhY2hlJyk7XG52YXIgX0JPTSA9IC9eXFx1RkVGRi87XG5cbi8qKlxuICogRUpTIHRlbXBsYXRlIGZ1bmN0aW9uIGNhY2hlLiBUaGlzIGNhbiBiZSBhIExSVSBvYmplY3QgZnJvbSBscnUtY2FjaGUgTlBNXG4gKiBtb2R1bGUuIEJ5IGRlZmF1bHQsIGl0IGlzIHtAbGluayBtb2R1bGU6dXRpbHMuY2FjaGV9LCBhIHNpbXBsZSBpbi1wcm9jZXNzXG4gKiBjYWNoZSB0aGF0IGdyb3dzIGNvbnRpbnVvdXNseS5cbiAqXG4gKiBAdHlwZSB7Q2FjaGV9XG4gKi9cblxuZXhwb3J0cy5jYWNoZSA9IHV0aWxzLmNhY2hlO1xuXG4vKipcbiAqIEN1c3RvbSBmaWxlIGxvYWRlci4gVXNlZnVsIGZvciB0ZW1wbGF0ZSBwcmVwcm9jZXNzaW5nIG9yIHJlc3RyaWN0aW5nIGFjY2Vzc1xuICogdG8gYSBjZXJ0YWluIHBhcnQgb2YgdGhlIGZpbGVzeXN0ZW0uXG4gKlxuICogQHR5cGUge2ZpbGVMb2FkZXJ9XG4gKi9cblxuZXhwb3J0cy5maWxlTG9hZGVyID0gZnMucmVhZEZpbGVTeW5jO1xuXG4vKipcbiAqIE5hbWUgb2YgdGhlIG9iamVjdCBjb250YWluaW5nIHRoZSBsb2NhbHMuXG4gKlxuICogVGhpcyB2YXJpYWJsZSBpcyBvdmVycmlkZGVuIGJ5IHtAbGluayBPcHRpb25zfWAubG9jYWxzTmFtZWAgaWYgaXQgaXMgbm90XG4gKiBgdW5kZWZpbmVkYC5cbiAqXG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQHB1YmxpY1xuICovXG5cbmV4cG9ydHMubG9jYWxzTmFtZSA9IF9ERUZBVUxUX0xPQ0FMU19OQU1FO1xuXG4vKipcbiAqIFByb21pc2UgaW1wbGVtZW50YXRpb24gLS0gZGVmYXVsdHMgdG8gdGhlIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBpZiBhdmFpbGFibGVcbiAqIFRoaXMgaXMgbW9zdGx5IGp1c3QgZm9yIHRlc3RhYmlsaXR5XG4gKlxuICogQHR5cGUge1Byb21pc2VDb25zdHJ1Y3Rvckxpa2V9XG4gKiBAcHVibGljXG4gKi9cblxuZXhwb3J0cy5wcm9taXNlSW1wbCA9IChuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzOycpKSgpLlByb21pc2U7XG5cbi8qKlxuICogR2V0IHRoZSBwYXRoIHRvIHRoZSBpbmNsdWRlZCBmaWxlIGZyb20gdGhlIHBhcmVudCBmaWxlIHBhdGggYW5kIHRoZVxuICogc3BlY2lmaWVkIHBhdGguXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9ICBuYW1lICAgICBzcGVjaWZpZWQgcGF0aFxuICogQHBhcmFtIHtTdHJpbmd9ICBmaWxlbmFtZSBwYXJlbnQgZmlsZSBwYXRoXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtpc0Rpcj1mYWxzZV0gd2hldGhlciB0aGUgcGFyZW50IGZpbGUgcGF0aCBpcyBhIGRpcmVjdG9yeVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLnJlc29sdmVJbmNsdWRlID0gZnVuY3Rpb24obmFtZSwgZmlsZW5hbWUsIGlzRGlyKSB7XG4gIHZhciBkaXJuYW1lID0gcGF0aC5kaXJuYW1lO1xuICB2YXIgZXh0bmFtZSA9IHBhdGguZXh0bmFtZTtcbiAgdmFyIHJlc29sdmUgPSBwYXRoLnJlc29sdmU7XG4gIHZhciBpbmNsdWRlUGF0aCA9IHJlc29sdmUoaXNEaXIgPyBmaWxlbmFtZSA6IGRpcm5hbWUoZmlsZW5hbWUpLCBuYW1lKTtcbiAgdmFyIGV4dCA9IGV4dG5hbWUobmFtZSk7XG4gIGlmICghZXh0KSB7XG4gICAgaW5jbHVkZVBhdGggKz0gJy5lanMnO1xuICB9XG4gIHJldHVybiBpbmNsdWRlUGF0aDtcbn07XG5cbi8qKlxuICogVHJ5IHRvIHJlc29sdmUgZmlsZSBwYXRoIG9uIG11bHRpcGxlIGRpcmVjdG9yaWVzXG4gKlxuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgbmFtZSAgc3BlY2lmaWVkIHBhdGhcbiAqIEBwYXJhbSAge0FycmF5PFN0cmluZz59IHBhdGhzIGxpc3Qgb2YgcG9zc2libGUgcGFyZW50IGRpcmVjdG9yeSBwYXRoc1xuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiByZXNvbHZlUGF0aHMobmFtZSwgcGF0aHMpIHtcbiAgdmFyIGZpbGVQYXRoO1xuICBpZiAocGF0aHMuc29tZShmdW5jdGlvbiAodikge1xuICAgIGZpbGVQYXRoID0gZXhwb3J0cy5yZXNvbHZlSW5jbHVkZShuYW1lLCB2LCB0cnVlKTtcbiAgICByZXR1cm4gZnMuZXhpc3RzU3luYyhmaWxlUGF0aCk7XG4gIH0pKSB7XG4gICAgcmV0dXJuIGZpbGVQYXRoO1xuICB9XG59XG5cbi8qKlxuICogR2V0IHRoZSBwYXRoIHRvIHRoZSBpbmNsdWRlZCBmaWxlIGJ5IE9wdGlvbnNcbiAqXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICBwYXRoICAgIHNwZWNpZmllZCBwYXRoXG4gKiBAcGFyYW0gIHtPcHRpb25zfSBvcHRpb25zIGNvbXBpbGF0aW9uIG9wdGlvbnNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0SW5jbHVkZVBhdGgocGF0aCwgb3B0aW9ucykge1xuICB2YXIgaW5jbHVkZVBhdGg7XG4gIHZhciBmaWxlUGF0aDtcbiAgdmFyIHZpZXdzID0gb3B0aW9ucy52aWV3cztcbiAgdmFyIG1hdGNoID0gL15bQS1aYS16XSs6XFxcXHxeXFwvLy5leGVjKHBhdGgpO1xuXG4gIC8vIEFicyBwYXRoXG4gIGlmIChtYXRjaCAmJiBtYXRjaC5sZW5ndGgpIHtcbiAgICBwYXRoID0gcGF0aC5yZXBsYWNlKC9eXFwvKi8sICcnKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvcHRpb25zLnJvb3QpKSB7XG4gICAgICBpbmNsdWRlUGF0aCA9IHJlc29sdmVQYXRocyhwYXRoLCBvcHRpb25zLnJvb3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbmNsdWRlUGF0aCA9IGV4cG9ydHMucmVzb2x2ZUluY2x1ZGUocGF0aCwgb3B0aW9ucy5yb290IHx8ICcvJywgdHJ1ZSk7XG4gICAgfVxuICB9XG4gIC8vIFJlbGF0aXZlIHBhdGhzXG4gIGVsc2Uge1xuICAgIC8vIExvb2sgcmVsYXRpdmUgdG8gYSBwYXNzZWQgZmlsZW5hbWUgZmlyc3RcbiAgICBpZiAob3B0aW9ucy5maWxlbmFtZSkge1xuICAgICAgZmlsZVBhdGggPSBleHBvcnRzLnJlc29sdmVJbmNsdWRlKHBhdGgsIG9wdGlvbnMuZmlsZW5hbWUpO1xuICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoZmlsZVBhdGgpKSB7XG4gICAgICAgIGluY2x1ZGVQYXRoID0gZmlsZVBhdGg7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFRoZW4gbG9vayBpbiBhbnkgdmlld3MgZGlyZWN0b3JpZXNcbiAgICBpZiAoIWluY2x1ZGVQYXRoICYmIEFycmF5LmlzQXJyYXkodmlld3MpKSB7XG4gICAgICBpbmNsdWRlUGF0aCA9IHJlc29sdmVQYXRocyhwYXRoLCB2aWV3cyk7XG4gICAgfVxuICAgIGlmICghaW5jbHVkZVBhdGggJiYgdHlwZW9mIG9wdGlvbnMuaW5jbHVkZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgdGhlIGluY2x1ZGUgZmlsZSBcIicgK1xuICAgICAgICAgIG9wdGlvbnMuZXNjYXBlRnVuY3Rpb24ocGF0aCkgKyAnXCInKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGluY2x1ZGVQYXRoO1xufVxuXG4vKipcbiAqIEdldCB0aGUgdGVtcGxhdGUgZnJvbSBhIHN0cmluZyBvciBhIGZpbGUsIGVpdGhlciBjb21waWxlZCBvbi10aGUtZmx5IG9yXG4gKiByZWFkIGZyb20gY2FjaGUgKGlmIGVuYWJsZWQpLCBhbmQgY2FjaGUgdGhlIHRlbXBsYXRlIGlmIG5lZWRlZC5cbiAqXG4gKiBJZiBgdGVtcGxhdGVgIGlzIG5vdCBzZXQsIHRoZSBmaWxlIHNwZWNpZmllZCBpbiBgb3B0aW9ucy5maWxlbmFtZWAgd2lsbCBiZVxuICogcmVhZC5cbiAqXG4gKiBJZiBgb3B0aW9ucy5jYWNoZWAgaXMgdHJ1ZSwgdGhpcyBmdW5jdGlvbiByZWFkcyB0aGUgZmlsZSBmcm9tXG4gKiBgb3B0aW9ucy5maWxlbmFtZWAgc28gaXQgbXVzdCBiZSBzZXQgcHJpb3IgdG8gY2FsbGluZyB0aGlzIGZ1bmN0aW9uLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6ZWpzLWludGVybmFsXG4gKiBAcGFyYW0ge09wdGlvbnN9IG9wdGlvbnMgICBjb21waWxhdGlvbiBvcHRpb25zXG4gKiBAcGFyYW0ge1N0cmluZ30gW3RlbXBsYXRlXSB0ZW1wbGF0ZSBzb3VyY2VcbiAqIEByZXR1cm4geyhUZW1wbGF0ZUZ1bmN0aW9ufENsaWVudEZ1bmN0aW9uKX1cbiAqIERlcGVuZGluZyBvbiB0aGUgdmFsdWUgb2YgYG9wdGlvbnMuY2xpZW50YCwgZWl0aGVyIHR5cGUgbWlnaHQgYmUgcmV0dXJuZWQuXG4gKiBAc3RhdGljXG4gKi9cblxuZnVuY3Rpb24gaGFuZGxlQ2FjaGUob3B0aW9ucywgdGVtcGxhdGUpIHtcbiAgdmFyIGZ1bmM7XG4gIHZhciBmaWxlbmFtZSA9IG9wdGlvbnMuZmlsZW5hbWU7XG4gIHZhciBoYXNUZW1wbGF0ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxO1xuXG4gIGlmIChvcHRpb25zLmNhY2hlKSB7XG4gICAgaWYgKCFmaWxlbmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYWNoZSBvcHRpb24gcmVxdWlyZXMgYSBmaWxlbmFtZScpO1xuICAgIH1cbiAgICBmdW5jID0gZXhwb3J0cy5jYWNoZS5nZXQoZmlsZW5hbWUpO1xuICAgIGlmIChmdW5jKSB7XG4gICAgICByZXR1cm4gZnVuYztcbiAgICB9XG4gICAgaWYgKCFoYXNUZW1wbGF0ZSkge1xuICAgICAgdGVtcGxhdGUgPSBmaWxlTG9hZGVyKGZpbGVuYW1lKS50b1N0cmluZygpLnJlcGxhY2UoX0JPTSwgJycpO1xuICAgIH1cbiAgfVxuICBlbHNlIGlmICghaGFzVGVtcGxhdGUpIHtcbiAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWY6IHNob3VsZCBub3QgaGFwcGVuIGF0IGFsbFxuICAgIGlmICghZmlsZW5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW50ZXJuYWwgRUpTIGVycm9yOiBubyBmaWxlIG5hbWUgb3IgdGVtcGxhdGUgJ1xuICAgICAgICAgICAgICAgICAgICArICdwcm92aWRlZCcpO1xuICAgIH1cbiAgICB0ZW1wbGF0ZSA9IGZpbGVMb2FkZXIoZmlsZW5hbWUpLnRvU3RyaW5nKCkucmVwbGFjZShfQk9NLCAnJyk7XG4gIH1cbiAgZnVuYyA9IGV4cG9ydHMuY29tcGlsZSh0ZW1wbGF0ZSwgb3B0aW9ucyk7XG4gIGlmIChvcHRpb25zLmNhY2hlKSB7XG4gICAgZXhwb3J0cy5jYWNoZS5zZXQoZmlsZW5hbWUsIGZ1bmMpO1xuICB9XG4gIHJldHVybiBmdW5jO1xufVxuXG4vKipcbiAqIFRyeSBjYWxsaW5nIGhhbmRsZUNhY2hlIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMgYW5kIGRhdGEgYW5kIGNhbGwgdGhlXG4gKiBjYWxsYmFjayB3aXRoIHRoZSByZXN1bHQuIElmIGFuIGVycm9yIG9jY3VycywgY2FsbCB0aGUgY2FsbGJhY2sgd2l0aFxuICogdGhlIGVycm9yLiBVc2VkIGJ5IHJlbmRlckZpbGUoKS5cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmVqcy1pbnRlcm5hbFxuICogQHBhcmFtIHtPcHRpb25zfSBvcHRpb25zICAgIGNvbXBpbGF0aW9uIG9wdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhICAgICAgICB0ZW1wbGF0ZSBkYXRhXG4gKiBAcGFyYW0ge1JlbmRlckZpbGVDYWxsYmFja30gY2IgY2FsbGJhY2tcbiAqIEBzdGF0aWNcbiAqL1xuXG5mdW5jdGlvbiB0cnlIYW5kbGVDYWNoZShvcHRpb25zLCBkYXRhLCBjYikge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoIWNiKSB7XG4gICAgaWYgKHR5cGVvZiBleHBvcnRzLnByb21pc2VJbXBsID09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBuZXcgZXhwb3J0cy5wcm9taXNlSW1wbChmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmVzdWx0ID0gaGFuZGxlQ2FjaGUob3B0aW9ucykoZGF0YSk7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcHJvdmlkZSBhIGNhbGxiYWNrIGZ1bmN0aW9uJyk7XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSBoYW5kbGVDYWNoZShvcHRpb25zKShkYXRhKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIGNiKGVycik7XG4gICAgfVxuXG4gICAgY2IobnVsbCwgcmVzdWx0KTtcbiAgfVxufVxuXG4vKipcbiAqIGZpbGVMb2FkZXIgaXMgaW5kZXBlbmRlbnRcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmlsZVBhdGggZWpzIGZpbGUgcGF0aC5cbiAqIEByZXR1cm4ge1N0cmluZ30gVGhlIGNvbnRlbnRzIG9mIHRoZSBzcGVjaWZpZWQgZmlsZS5cbiAqIEBzdGF0aWNcbiAqL1xuXG5mdW5jdGlvbiBmaWxlTG9hZGVyKGZpbGVQYXRoKXtcbiAgcmV0dXJuIGV4cG9ydHMuZmlsZUxvYWRlcihmaWxlUGF0aCk7XG59XG5cbi8qKlxuICogR2V0IHRoZSB0ZW1wbGF0ZSBmdW5jdGlvbi5cbiAqXG4gKiBJZiBgb3B0aW9ucy5jYWNoZWAgaXMgYHRydWVgLCB0aGVuIHRoZSB0ZW1wbGF0ZSBpcyBjYWNoZWQuXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTplanMtaW50ZXJuYWxcbiAqIEBwYXJhbSB7U3RyaW5nfSAgcGF0aCAgICBwYXRoIGZvciB0aGUgc3BlY2lmaWVkIGZpbGVcbiAqIEBwYXJhbSB7T3B0aW9uc30gb3B0aW9ucyBjb21waWxhdGlvbiBvcHRpb25zXG4gKiBAcmV0dXJuIHsoVGVtcGxhdGVGdW5jdGlvbnxDbGllbnRGdW5jdGlvbil9XG4gKiBEZXBlbmRpbmcgb24gdGhlIHZhbHVlIG9mIGBvcHRpb25zLmNsaWVudGAsIGVpdGhlciB0eXBlIG1pZ2h0IGJlIHJldHVybmVkXG4gKiBAc3RhdGljXG4gKi9cblxuZnVuY3Rpb24gaW5jbHVkZUZpbGUocGF0aCwgb3B0aW9ucykge1xuICB2YXIgb3B0cyA9IHV0aWxzLnNoYWxsb3dDb3B5KHt9LCBvcHRpb25zKTtcbiAgb3B0cy5maWxlbmFtZSA9IGdldEluY2x1ZGVQYXRoKHBhdGgsIG9wdHMpO1xuICBpZiAodHlwZW9mIG9wdGlvbnMuaW5jbHVkZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgaW5jbHVkZXJSZXN1bHQgPSBvcHRpb25zLmluY2x1ZGVyKHBhdGgsIG9wdHMuZmlsZW5hbWUpO1xuICAgIGlmIChpbmNsdWRlclJlc3VsdCkge1xuICAgICAgaWYgKGluY2x1ZGVyUmVzdWx0LmZpbGVuYW1lKSB7XG4gICAgICAgIG9wdHMuZmlsZW5hbWUgPSBpbmNsdWRlclJlc3VsdC5maWxlbmFtZTtcbiAgICAgIH1cbiAgICAgIGlmIChpbmNsdWRlclJlc3VsdC50ZW1wbGF0ZSkge1xuICAgICAgICByZXR1cm4gaGFuZGxlQ2FjaGUob3B0cywgaW5jbHVkZXJSZXN1bHQudGVtcGxhdGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gaGFuZGxlQ2FjaGUob3B0cyk7XG59XG5cbi8qKlxuICogUmUtdGhyb3cgdGhlIGdpdmVuIGBlcnJgIGluIGNvbnRleHQgdG8gdGhlIGBzdHJgIG9mIGVqcywgYGZpbGVuYW1lYCwgYW5kXG4gKiBgbGluZW5vYC5cbiAqXG4gKiBAaW1wbGVtZW50cyB7UmV0aHJvd0NhbGxiYWNrfVxuICogQG1lbWJlcm9mIG1vZHVsZTplanMtaW50ZXJuYWxcbiAqIEBwYXJhbSB7RXJyb3J9ICBlcnIgICAgICBFcnJvciBvYmplY3RcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgICAgICBFSlMgc291cmNlXG4gKiBAcGFyYW0ge1N0cmluZ30gZmxubSAgICAgZmlsZSBuYW1lIG9mIHRoZSBFSlMgZmlsZVxuICogQHBhcmFtIHtOdW1iZXJ9IGxpbmVubyAgIGxpbmUgbnVtYmVyIG9mIHRoZSBlcnJvclxuICogQHBhcmFtIHtFc2NhcGVDYWxsYmFja30gZXNjXG4gKiBAc3RhdGljXG4gKi9cblxuZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmxubSwgbGluZW5vLCBlc2MpIHtcbiAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KCdcXG4nKTtcbiAgdmFyIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCk7XG4gIHZhciBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICB2YXIgZmlsZW5hbWUgPSBlc2MoZmxubSk7XG4gIC8vIEVycm9yIGNvbnRleHRcbiAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24gKGxpbmUsIGkpe1xuICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gJyA+PiAnIDogJyAgICAnKVxuICAgICAgKyBjdXJyXG4gICAgICArICd8ICdcbiAgICAgICsgbGluZTtcbiAgfSkuam9pbignXFxuJyk7XG5cbiAgLy8gQWx0ZXIgZXhjZXB0aW9uIG1lc3NhZ2VcbiAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgJ2VqcycpICsgJzonXG4gICAgKyBsaW5lbm8gKyAnXFxuJ1xuICAgICsgY29udGV4dCArICdcXG5cXG4nXG4gICAgKyBlcnIubWVzc2FnZTtcblxuICB0aHJvdyBlcnI7XG59XG5cbmZ1bmN0aW9uIHN0cmlwU2VtaShzdHIpe1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLzsoXFxzKiQpLywgJyQxJyk7XG59XG5cbi8qKlxuICogQ29tcGlsZSB0aGUgZ2l2ZW4gYHN0cmAgb2YgZWpzIGludG8gYSB0ZW1wbGF0ZSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gIHRlbXBsYXRlIEVKUyB0ZW1wbGF0ZVxuICpcbiAqIEBwYXJhbSB7T3B0aW9uc30gW29wdHNdIGNvbXBpbGF0aW9uIG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJuIHsoVGVtcGxhdGVGdW5jdGlvbnxDbGllbnRGdW5jdGlvbil9XG4gKiBEZXBlbmRpbmcgb24gdGhlIHZhbHVlIG9mIGBvcHRzLmNsaWVudGAsIGVpdGhlciB0eXBlIG1pZ2h0IGJlIHJldHVybmVkLlxuICogTm90ZSB0aGF0IHRoZSByZXR1cm4gdHlwZSBvZiB0aGUgZnVuY3Rpb24gYWxzbyBkZXBlbmRzIG9uIHRoZSB2YWx1ZSBvZiBgb3B0cy5hc3luY2AuXG4gKiBAcHVibGljXG4gKi9cblxuZXhwb3J0cy5jb21waWxlID0gZnVuY3Rpb24gY29tcGlsZSh0ZW1wbGF0ZSwgb3B0cykge1xuICB2YXIgdGVtcGw7XG5cbiAgLy8gdjEgY29tcGF0XG4gIC8vICdzY29wZScgaXMgJ2NvbnRleHQnXG4gIC8vIEZJWE1FOiBSZW1vdmUgdGhpcyBpbiBhIGZ1dHVyZSB2ZXJzaW9uXG4gIGlmIChvcHRzICYmIG9wdHMuc2NvcGUpIHtcbiAgICBpZiAoIXNjb3BlT3B0aW9uV2FybmVkKXtcbiAgICAgIGNvbnNvbGUud2FybignYHNjb3BlYCBvcHRpb24gaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIEVKUyAzJyk7XG4gICAgICBzY29wZU9wdGlvbldhcm5lZCA9IHRydWU7XG4gICAgfVxuICAgIGlmICghb3B0cy5jb250ZXh0KSB7XG4gICAgICBvcHRzLmNvbnRleHQgPSBvcHRzLnNjb3BlO1xuICAgIH1cbiAgICBkZWxldGUgb3B0cy5zY29wZTtcbiAgfVxuICB0ZW1wbCA9IG5ldyBUZW1wbGF0ZSh0ZW1wbGF0ZSwgb3B0cyk7XG4gIHJldHVybiB0ZW1wbC5jb21waWxlKCk7XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYHRlbXBsYXRlYCBvZiBlanMuXG4gKlxuICogSWYgeW91IHdvdWxkIGxpa2UgdG8gaW5jbHVkZSBvcHRpb25zIGJ1dCBub3QgZGF0YSwgeW91IG5lZWQgdG8gZXhwbGljaXRseVxuICogY2FsbCB0aGlzIGZ1bmN0aW9uIHdpdGggYGRhdGFgIGJlaW5nIGFuIGVtcHR5IG9iamVjdCBvciBgbnVsbGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9ICAgdGVtcGxhdGUgRUpTIHRlbXBsYXRlXG4gKiBAcGFyYW0ge09iamVjdH0gIFtkYXRhPXt9XSB0ZW1wbGF0ZSBkYXRhXG4gKiBAcGFyYW0ge09wdGlvbnN9IFtvcHRzPXt9XSBjb21waWxhdGlvbiBhbmQgcmVuZGVyaW5nIG9wdGlvbnNcbiAqIEByZXR1cm4geyhTdHJpbmd8UHJvbWlzZTxTdHJpbmc+KX1cbiAqIFJldHVybiB2YWx1ZSB0eXBlIGRlcGVuZHMgb24gYG9wdHMuYXN5bmNgLlxuICogQHB1YmxpY1xuICovXG5cbmV4cG9ydHMucmVuZGVyID0gZnVuY3Rpb24gKHRlbXBsYXRlLCBkLCBvKSB7XG4gIHZhciBkYXRhID0gZCB8fCB7fTtcbiAgdmFyIG9wdHMgPSBvIHx8IHt9O1xuXG4gIC8vIE5vIG9wdGlvbnMgb2JqZWN0IC0tIGlmIHRoZXJlIGFyZSBvcHRpb255IG5hbWVzXG4gIC8vIGluIHRoZSBkYXRhLCBjb3B5IHRoZW0gdG8gb3B0aW9uc1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAyKSB7XG4gICAgdXRpbHMuc2hhbGxvd0NvcHlGcm9tTGlzdChvcHRzLCBkYXRhLCBfT1BUU19QQVNTQUJMRV9XSVRIX0RBVEEpO1xuICB9XG5cbiAgcmV0dXJuIGhhbmRsZUNhY2hlKG9wdHMsIHRlbXBsYXRlKShkYXRhKTtcbn07XG5cbi8qKlxuICogUmVuZGVyIGFuIEVKUyBmaWxlIGF0IHRoZSBnaXZlbiBgcGF0aGAgYW5kIGNhbGxiYWNrIGBjYihlcnIsIHN0cilgLlxuICpcbiAqIElmIHlvdSB3b3VsZCBsaWtlIHRvIGluY2x1ZGUgb3B0aW9ucyBidXQgbm90IGRhdGEsIHlvdSBuZWVkIHRvIGV4cGxpY2l0bHlcbiAqIGNhbGwgdGhpcyBmdW5jdGlvbiB3aXRoIGBkYXRhYCBiZWluZyBhbiBlbXB0eSBvYmplY3Qgb3IgYG51bGxgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICAgICBwYXRoICAgICBwYXRoIHRvIHRoZSBFSlMgZmlsZVxuICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgICAgW2RhdGE9e31dIHRlbXBsYXRlIGRhdGFcbiAqIEBwYXJhbSB7T3B0aW9uc30gICAgICAgICAgIFtvcHRzPXt9XSBjb21waWxhdGlvbiBhbmQgcmVuZGVyaW5nIG9wdGlvbnNcbiAqIEBwYXJhbSB7UmVuZGVyRmlsZUNhbGxiYWNrfSBjYiBjYWxsYmFja1xuICogQHB1YmxpY1xuICovXG5cbmV4cG9ydHMucmVuZGVyRmlsZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICB2YXIgZmlsZW5hbWUgPSBhcmdzLnNoaWZ0KCk7XG4gIHZhciBjYjtcbiAgdmFyIG9wdHMgPSB7ZmlsZW5hbWU6IGZpbGVuYW1lfTtcbiAgdmFyIGRhdGE7XG4gIHZhciB2aWV3T3B0cztcblxuICAvLyBEbyB3ZSBoYXZlIGEgY2FsbGJhY2s/XG4gIGlmICh0eXBlb2YgYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgY2IgPSBhcmdzLnBvcCgpO1xuICB9XG4gIC8vIERvIHdlIGhhdmUgZGF0YS9vcHRzP1xuICBpZiAoYXJncy5sZW5ndGgpIHtcbiAgICAvLyBTaG91bGQgYWx3YXlzIGhhdmUgZGF0YSBvYmpcbiAgICBkYXRhID0gYXJncy5zaGlmdCgpO1xuICAgIC8vIE5vcm1hbCBwYXNzZWQgb3B0cyAoZGF0YSBvYmogKyBvcHRzIG9iailcbiAgICBpZiAoYXJncy5sZW5ndGgpIHtcbiAgICAgIC8vIFVzZSBzaGFsbG93Q29weSBzbyB3ZSBkb24ndCBwb2xsdXRlIHBhc3NlZCBpbiBvcHRzIG9iaiB3aXRoIG5ldyB2YWxzXG4gICAgICB1dGlscy5zaGFsbG93Q29weShvcHRzLCBhcmdzLnBvcCgpKTtcbiAgICB9XG4gICAgLy8gU3BlY2lhbCBjYXNpbmcgZm9yIEV4cHJlc3MgKHNldHRpbmdzICsgb3B0cy1pbi1kYXRhKVxuICAgIGVsc2Uge1xuICAgICAgLy8gRXhwcmVzcyAzIGFuZCA0XG4gICAgICBpZiAoZGF0YS5zZXR0aW5ncykge1xuICAgICAgICAvLyBQdWxsIGEgZmV3IHRoaW5ncyBmcm9tIGtub3duIGxvY2F0aW9uc1xuICAgICAgICBpZiAoZGF0YS5zZXR0aW5ncy52aWV3cykge1xuICAgICAgICAgIG9wdHMudmlld3MgPSBkYXRhLnNldHRpbmdzLnZpZXdzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnNldHRpbmdzWyd2aWV3IGNhY2hlJ10pIHtcbiAgICAgICAgICBvcHRzLmNhY2hlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBVbmRvY3VtZW50ZWQgYWZ0ZXIgRXhwcmVzcyAyLCBidXQgc3RpbGwgdXNhYmxlLCBlc3AuIGZvclxuICAgICAgICAvLyBpdGVtcyB0aGF0IGFyZSB1bnNhZmUgdG8gYmUgcGFzc2VkIGFsb25nIHdpdGggZGF0YSwgbGlrZSBgcm9vdGBcbiAgICAgICAgdmlld09wdHMgPSBkYXRhLnNldHRpbmdzWyd2aWV3IG9wdGlvbnMnXTtcbiAgICAgICAgaWYgKHZpZXdPcHRzKSB7XG4gICAgICAgICAgdXRpbHMuc2hhbGxvd0NvcHkob3B0cywgdmlld09wdHMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBFeHByZXNzIDIgYW5kIGxvd2VyLCB2YWx1ZXMgc2V0IGluIGFwcC5sb2NhbHMsIG9yIHBlb3BsZSB3aG8ganVzdFxuICAgICAgLy8gd2FudCB0byBwYXNzIG9wdGlvbnMgaW4gdGhlaXIgZGF0YS4gTk9URTogVGhlc2UgdmFsdWVzIHdpbGwgb3ZlcnJpZGVcbiAgICAgIC8vIGFueXRoaW5nIHByZXZpb3VzbHkgc2V0IGluIHNldHRpbmdzICBvciBzZXR0aW5nc1sndmlldyBvcHRpb25zJ11cbiAgICAgIHV0aWxzLnNoYWxsb3dDb3B5RnJvbUxpc3Qob3B0cywgZGF0YSwgX09QVFNfUEFTU0FCTEVfV0lUSF9EQVRBX0VYUFJFU1MpO1xuICAgIH1cbiAgICBvcHRzLmZpbGVuYW1lID0gZmlsZW5hbWU7XG4gIH1cbiAgZWxzZSB7XG4gICAgZGF0YSA9IHt9O1xuICB9XG5cbiAgcmV0dXJuIHRyeUhhbmRsZUNhY2hlKG9wdHMsIGRhdGEsIGNiKTtcbn07XG5cbi8qKlxuICogQ2xlYXIgaW50ZXJtZWRpYXRlIEphdmFTY3JpcHQgY2FjaGUuIENhbGxzIHtAbGluayBDYWNoZSNyZXNldH0uXG4gKiBAcHVibGljXG4gKi9cblxuLyoqXG4gKiBFSlMgdGVtcGxhdGUgY2xhc3NcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0cy5UZW1wbGF0ZSA9IFRlbXBsYXRlO1xuXG5leHBvcnRzLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiAoKSB7XG4gIGV4cG9ydHMuY2FjaGUucmVzZXQoKTtcbn07XG5cbmZ1bmN0aW9uIFRlbXBsYXRlKHRleHQsIG9wdHMpIHtcbiAgb3B0cyA9IG9wdHMgfHwge307XG4gIHZhciBvcHRpb25zID0ge307XG4gIHRoaXMudGVtcGxhdGVUZXh0ID0gdGV4dDtcbiAgLyoqIEB0eXBlIHtzdHJpbmcgfCBudWxsfSAqL1xuICB0aGlzLm1vZGUgPSBudWxsO1xuICB0aGlzLnRydW5jYXRlID0gZmFsc2U7XG4gIHRoaXMuY3VycmVudExpbmUgPSAxO1xuICB0aGlzLnNvdXJjZSA9ICcnO1xuICBvcHRpb25zLmNsaWVudCA9IG9wdHMuY2xpZW50IHx8IGZhbHNlO1xuICBvcHRpb25zLmVzY2FwZUZ1bmN0aW9uID0gb3B0cy5lc2NhcGUgfHwgb3B0cy5lc2NhcGVGdW5jdGlvbiB8fCB1dGlscy5lc2NhcGVYTUw7XG4gIG9wdGlvbnMuY29tcGlsZURlYnVnID0gb3B0cy5jb21waWxlRGVidWcgIT09IGZhbHNlO1xuICBvcHRpb25zLmRlYnVnID0gISFvcHRzLmRlYnVnO1xuICBvcHRpb25zLmZpbGVuYW1lID0gb3B0cy5maWxlbmFtZTtcbiAgb3B0aW9ucy5vcGVuRGVsaW1pdGVyID0gb3B0cy5vcGVuRGVsaW1pdGVyIHx8IGV4cG9ydHMub3BlbkRlbGltaXRlciB8fCBfREVGQVVMVF9PUEVOX0RFTElNSVRFUjtcbiAgb3B0aW9ucy5jbG9zZURlbGltaXRlciA9IG9wdHMuY2xvc2VEZWxpbWl0ZXIgfHwgZXhwb3J0cy5jbG9zZURlbGltaXRlciB8fCBfREVGQVVMVF9DTE9TRV9ERUxJTUlURVI7XG4gIG9wdGlvbnMuZGVsaW1pdGVyID0gb3B0cy5kZWxpbWl0ZXIgfHwgZXhwb3J0cy5kZWxpbWl0ZXIgfHwgX0RFRkFVTFRfREVMSU1JVEVSO1xuICBvcHRpb25zLnN0cmljdCA9IG9wdHMuc3RyaWN0IHx8IGZhbHNlO1xuICBvcHRpb25zLmNvbnRleHQgPSBvcHRzLmNvbnRleHQ7XG4gIG9wdGlvbnMuY2FjaGUgPSBvcHRzLmNhY2hlIHx8IGZhbHNlO1xuICBvcHRpb25zLnJtV2hpdGVzcGFjZSA9IG9wdHMucm1XaGl0ZXNwYWNlO1xuICBvcHRpb25zLnJvb3QgPSBvcHRzLnJvb3Q7XG4gIG9wdGlvbnMuaW5jbHVkZXIgPSBvcHRzLmluY2x1ZGVyO1xuICBvcHRpb25zLm91dHB1dEZ1bmN0aW9uTmFtZSA9IG9wdHMub3V0cHV0RnVuY3Rpb25OYW1lO1xuICBvcHRpb25zLmxvY2Fsc05hbWUgPSBvcHRzLmxvY2Fsc05hbWUgfHwgZXhwb3J0cy5sb2NhbHNOYW1lIHx8IF9ERUZBVUxUX0xPQ0FMU19OQU1FO1xuICBvcHRpb25zLnZpZXdzID0gb3B0cy52aWV3cztcbiAgb3B0aW9ucy5hc3luYyA9IG9wdHMuYXN5bmM7XG4gIG9wdGlvbnMuZGVzdHJ1Y3R1cmVkTG9jYWxzID0gb3B0cy5kZXN0cnVjdHVyZWRMb2NhbHM7XG4gIG9wdGlvbnMubGVnYWN5SW5jbHVkZSA9IHR5cGVvZiBvcHRzLmxlZ2FjeUluY2x1ZGUgIT0gJ3VuZGVmaW5lZCcgPyAhIW9wdHMubGVnYWN5SW5jbHVkZSA6IHRydWU7XG5cbiAgaWYgKG9wdGlvbnMuc3RyaWN0KSB7XG4gICAgb3B0aW9ucy5fd2l0aCA9IGZhbHNlO1xuICB9XG4gIGVsc2Uge1xuICAgIG9wdGlvbnMuX3dpdGggPSB0eXBlb2Ygb3B0cy5fd2l0aCAhPSAndW5kZWZpbmVkJyA/IG9wdHMuX3dpdGggOiB0cnVlO1xuICB9XG5cbiAgdGhpcy5vcHRzID0gb3B0aW9ucztcblxuICB0aGlzLnJlZ2V4ID0gdGhpcy5jcmVhdGVSZWdleCgpO1xufVxuXG5UZW1wbGF0ZS5tb2RlcyA9IHtcbiAgRVZBTDogJ2V2YWwnLFxuICBFU0NBUEVEOiAnZXNjYXBlZCcsXG4gIFJBVzogJ3JhdycsXG4gIENPTU1FTlQ6ICdjb21tZW50JyxcbiAgTElURVJBTDogJ2xpdGVyYWwnXG59O1xuXG5UZW1wbGF0ZS5wcm90b3R5cGUgPSB7XG4gIGNyZWF0ZVJlZ2V4OiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN0ciA9IF9SRUdFWF9TVFJJTkc7XG4gICAgdmFyIGRlbGltID0gdXRpbHMuZXNjYXBlUmVnRXhwQ2hhcnModGhpcy5vcHRzLmRlbGltaXRlcik7XG4gICAgdmFyIG9wZW4gPSB1dGlscy5lc2NhcGVSZWdFeHBDaGFycyh0aGlzLm9wdHMub3BlbkRlbGltaXRlcik7XG4gICAgdmFyIGNsb3NlID0gdXRpbHMuZXNjYXBlUmVnRXhwQ2hhcnModGhpcy5vcHRzLmNsb3NlRGVsaW1pdGVyKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJS9nLCBkZWxpbSlcbiAgICAgIC5yZXBsYWNlKC88L2csIG9wZW4pXG4gICAgICAucmVwbGFjZSgvPi9nLCBjbG9zZSk7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoc3RyKTtcbiAgfSxcblxuICBjb21waWxlOiBmdW5jdGlvbiAoKSB7XG4gICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgdmFyIHNyYztcbiAgICAvKiogQHR5cGUge0NsaWVudEZ1bmN0aW9ufSAqL1xuICAgIHZhciBmbjtcbiAgICB2YXIgb3B0cyA9IHRoaXMub3B0cztcbiAgICB2YXIgcHJlcGVuZGVkID0gJyc7XG4gICAgdmFyIGFwcGVuZGVkID0gJyc7XG4gICAgLyoqIEB0eXBlIHtFc2NhcGVDYWxsYmFja30gKi9cbiAgICB2YXIgZXNjYXBlRm4gPSBvcHRzLmVzY2FwZUZ1bmN0aW9uO1xuICAgIC8qKiBAdHlwZSB7RnVuY3Rpb25Db25zdHJ1Y3Rvcn0gKi9cbiAgICB2YXIgY3RvcjtcbiAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICB2YXIgc2FuaXRpemVkRmlsZW5hbWUgPSBvcHRzLmZpbGVuYW1lID8gSlNPTi5zdHJpbmdpZnkob3B0cy5maWxlbmFtZSkgOiAndW5kZWZpbmVkJztcblxuICAgIGlmICghdGhpcy5zb3VyY2UpIHtcbiAgICAgIHRoaXMuZ2VuZXJhdGVTb3VyY2UoKTtcbiAgICAgIHByZXBlbmRlZCArPVxuICAgICAgICAnICB2YXIgX19vdXRwdXQgPSBcIlwiO1xcbicgK1xuICAgICAgICAnICBmdW5jdGlvbiBfX2FwcGVuZChzKSB7IGlmIChzICE9PSB1bmRlZmluZWQgJiYgcyAhPT0gbnVsbCkgX19vdXRwdXQgKz0gcyB9XFxuJztcbiAgICAgIGlmIChvcHRzLm91dHB1dEZ1bmN0aW9uTmFtZSkge1xuICAgICAgICBwcmVwZW5kZWQgKz0gJyAgdmFyICcgKyBvcHRzLm91dHB1dEZ1bmN0aW9uTmFtZSArICcgPSBfX2FwcGVuZDsnICsgJ1xcbic7XG4gICAgICB9XG4gICAgICBpZiAob3B0cy5kZXN0cnVjdHVyZWRMb2NhbHMgJiYgb3B0cy5kZXN0cnVjdHVyZWRMb2NhbHMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBkZXN0cnVjdHVyaW5nID0gJyAgdmFyIF9fbG9jYWxzID0gKCcgKyBvcHRzLmxvY2Fsc05hbWUgKyAnIHx8IHt9KSxcXG4nO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9wdHMuZGVzdHJ1Y3R1cmVkTG9jYWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIG5hbWUgPSBvcHRzLmRlc3RydWN0dXJlZExvY2Fsc1tpXTtcbiAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgIGRlc3RydWN0dXJpbmcgKz0gJyxcXG4gICc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRlc3RydWN0dXJpbmcgKz0gbmFtZSArICcgPSBfX2xvY2Fscy4nICsgbmFtZTtcbiAgICAgICAgfVxuICAgICAgICBwcmVwZW5kZWQgKz0gZGVzdHJ1Y3R1cmluZyArICc7XFxuJztcbiAgICAgIH1cbiAgICAgIGlmIChvcHRzLl93aXRoICE9PSBmYWxzZSkge1xuICAgICAgICBwcmVwZW5kZWQgKz0gICcgIHdpdGggKCcgKyBvcHRzLmxvY2Fsc05hbWUgKyAnIHx8IHt9KSB7JyArICdcXG4nO1xuICAgICAgICBhcHBlbmRlZCArPSAnICB9JyArICdcXG4nO1xuICAgICAgfVxuICAgICAgYXBwZW5kZWQgKz0gJyAgcmV0dXJuIF9fb3V0cHV0OycgKyAnXFxuJztcbiAgICAgIHRoaXMuc291cmNlID0gcHJlcGVuZGVkICsgdGhpcy5zb3VyY2UgKyBhcHBlbmRlZDtcbiAgICB9XG5cbiAgICBpZiAob3B0cy5jb21waWxlRGVidWcpIHtcbiAgICAgIHNyYyA9ICd2YXIgX19saW5lID0gMScgKyAnXFxuJ1xuICAgICAgICArICcgICwgX19saW5lcyA9ICcgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnRlbXBsYXRlVGV4dCkgKyAnXFxuJ1xuICAgICAgICArICcgICwgX19maWxlbmFtZSA9ICcgKyBzYW5pdGl6ZWRGaWxlbmFtZSArICc7JyArICdcXG4nXG4gICAgICAgICsgJ3RyeSB7JyArICdcXG4nXG4gICAgICAgICsgdGhpcy5zb3VyY2VcbiAgICAgICAgKyAnfSBjYXRjaCAoZSkgeycgKyAnXFxuJ1xuICAgICAgICArICcgIHJldGhyb3coZSwgX19saW5lcywgX19maWxlbmFtZSwgX19saW5lLCBlc2NhcGVGbik7JyArICdcXG4nXG4gICAgICAgICsgJ30nICsgJ1xcbic7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgc3JjID0gdGhpcy5zb3VyY2U7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuY2xpZW50KSB7XG4gICAgICBzcmMgPSAnZXNjYXBlRm4gPSBlc2NhcGVGbiB8fCAnICsgZXNjYXBlRm4udG9TdHJpbmcoKSArICc7JyArICdcXG4nICsgc3JjO1xuICAgICAgaWYgKG9wdHMuY29tcGlsZURlYnVnKSB7XG4gICAgICAgIHNyYyA9ICdyZXRocm93ID0gcmV0aHJvdyB8fCAnICsgcmV0aHJvdy50b1N0cmluZygpICsgJzsnICsgJ1xcbicgKyBzcmM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuc3RyaWN0KSB7XG4gICAgICBzcmMgPSAnXCJ1c2Ugc3RyaWN0XCI7XFxuJyArIHNyYztcbiAgICB9XG4gICAgaWYgKG9wdHMuZGVidWcpIHtcbiAgICAgIGNvbnNvbGUubG9nKHNyYyk7XG4gICAgfVxuICAgIGlmIChvcHRzLmNvbXBpbGVEZWJ1ZyAmJiBvcHRzLmZpbGVuYW1lKSB7XG4gICAgICBzcmMgPSBzcmMgKyAnXFxuJ1xuICAgICAgICArICcvLyMgc291cmNlVVJMPScgKyBzYW5pdGl6ZWRGaWxlbmFtZSArICdcXG4nO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBpZiAob3B0cy5hc3luYykge1xuICAgICAgICAvLyBIYXZlIHRvIHVzZSBnZW5lcmF0ZWQgZnVuY3Rpb24gZm9yIHRoaXMsIHNpbmNlIGluIGVudnMgd2l0aG91dCBzdXBwb3J0LFxuICAgICAgICAvLyBpdCBicmVha3MgaW4gcGFyc2luZ1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGN0b3IgPSAobmV3IEZ1bmN0aW9uKCdyZXR1cm4gKGFzeW5jIGZ1bmN0aW9uKCl7fSkuY29uc3RydWN0b3I7JykpKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2goZSkge1xuICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgU3ludGF4RXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBlbnZpcm9ubWVudCBkb2VzIG5vdCBzdXBwb3J0IGFzeW5jL2F3YWl0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjdG9yID0gRnVuY3Rpb247XG4gICAgICB9XG4gICAgICBmbiA9IG5ldyBjdG9yKG9wdHMubG9jYWxzTmFtZSArICcsIGVzY2FwZUZuLCBpbmNsdWRlLCByZXRocm93Jywgc3JjKTtcbiAgICB9XG4gICAgY2F0Y2goZSkge1xuICAgICAgLy8gaXN0YW5idWwgaWdub3JlIGVsc2VcbiAgICAgIGlmIChlIGluc3RhbmNlb2YgU3ludGF4RXJyb3IpIHtcbiAgICAgICAgaWYgKG9wdHMuZmlsZW5hbWUpIHtcbiAgICAgICAgICBlLm1lc3NhZ2UgKz0gJyBpbiAnICsgb3B0cy5maWxlbmFtZTtcbiAgICAgICAgfVxuICAgICAgICBlLm1lc3NhZ2UgKz0gJyB3aGlsZSBjb21waWxpbmcgZWpzXFxuXFxuJztcbiAgICAgICAgZS5tZXNzYWdlICs9ICdJZiB0aGUgYWJvdmUgZXJyb3IgaXMgbm90IGhlbHBmdWwsIHlvdSBtYXkgd2FudCB0byB0cnkgRUpTLUxpbnQ6XFxuJztcbiAgICAgICAgZS5tZXNzYWdlICs9ICdodHRwczovL2dpdGh1Yi5jb20vUnlhblppbS9FSlMtTGludCc7XG4gICAgICAgIGlmICghb3B0cy5hc3luYykge1xuICAgICAgICAgIGUubWVzc2FnZSArPSAnXFxuJztcbiAgICAgICAgICBlLm1lc3NhZ2UgKz0gJ09yLCBpZiB5b3UgbWVhbnQgdG8gY3JlYXRlIGFuIGFzeW5jIGZ1bmN0aW9uLCBwYXNzIGBhc3luYzogdHJ1ZWAgYXMgYW4gb3B0aW9uLic7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRocm93IGU7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGEgY2FsbGFibGUgZnVuY3Rpb24gd2hpY2ggd2lsbCBleGVjdXRlIHRoZSBmdW5jdGlvblxuICAgIC8vIGNyZWF0ZWQgYnkgdGhlIHNvdXJjZS1jb2RlLCB3aXRoIHRoZSBwYXNzZWQgZGF0YSBhcyBsb2NhbHNcbiAgICAvLyBBZGRzIGEgbG9jYWwgYGluY2x1ZGVgIGZ1bmN0aW9uIHdoaWNoIGFsbG93cyBmdWxsIHJlY3Vyc2l2ZSBpbmNsdWRlXG4gICAgdmFyIHJldHVybmVkRm4gPSBvcHRzLmNsaWVudCA/IGZuIDogZnVuY3Rpb24gYW5vbnltb3VzKGRhdGEpIHtcbiAgICAgIHZhciBpbmNsdWRlID0gZnVuY3Rpb24gKHBhdGgsIGluY2x1ZGVEYXRhKSB7XG4gICAgICAgIHZhciBkID0gdXRpbHMuc2hhbGxvd0NvcHkoe30sIGRhdGEpO1xuICAgICAgICBpZiAoaW5jbHVkZURhdGEpIHtcbiAgICAgICAgICBkID0gdXRpbHMuc2hhbGxvd0NvcHkoZCwgaW5jbHVkZURhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbmNsdWRlRmlsZShwYXRoLCBvcHRzKShkKTtcbiAgICAgIH07XG4gICAgICByZXR1cm4gZm4uYXBwbHkob3B0cy5jb250ZXh0LCBbZGF0YSB8fCB7fSwgZXNjYXBlRm4sIGluY2x1ZGUsIHJldGhyb3ddKTtcbiAgICB9O1xuICAgIGlmIChvcHRzLmZpbGVuYW1lICYmIHR5cGVvZiBPYmplY3QuZGVmaW5lUHJvcGVydHkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhciBmaWxlbmFtZSA9IG9wdHMuZmlsZW5hbWU7XG4gICAgICB2YXIgYmFzZW5hbWUgPSBwYXRoLmJhc2VuYW1lKGZpbGVuYW1lLCBwYXRoLmV4dG5hbWUoZmlsZW5hbWUpKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXR1cm5lZEZuLCAnbmFtZScsIHtcbiAgICAgICAgICB2YWx1ZTogYmFzZW5hbWUsXG4gICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsvKiBpZ25vcmUgKi99XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5lZEZuO1xuICB9LFxuXG4gIGdlbmVyYXRlU291cmNlOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9wdHMgPSB0aGlzLm9wdHM7XG5cbiAgICBpZiAob3B0cy5ybVdoaXRlc3BhY2UpIHtcbiAgICAgIC8vIEhhdmUgdG8gdXNlIHR3byBzZXBhcmF0ZSByZXBsYWNlIGhlcmUgYXMgYF5gIGFuZCBgJGAgb3BlcmF0b3JzIGRvbid0XG4gICAgICAvLyB3b3JrIHdlbGwgd2l0aCBgXFxyYCBhbmQgZW1wdHkgbGluZXMgZG9uJ3Qgd29yayB3ZWxsIHdpdGggdGhlIGBtYCBmbGFnLlxuICAgICAgdGhpcy50ZW1wbGF0ZVRleHQgPVxuICAgICAgICB0aGlzLnRlbXBsYXRlVGV4dC5yZXBsYWNlKC9bXFxyXFxuXSsvZywgJ1xcbicpLnJlcGxhY2UoL15cXHMrfFxccyskL2dtLCAnJyk7XG4gICAgfVxuXG4gICAgLy8gU2x1cnAgc3BhY2VzIGFuZCB0YWJzIGJlZm9yZSA8JV8gYW5kIGFmdGVyIF8lPlxuICAgIHRoaXMudGVtcGxhdGVUZXh0ID1cbiAgICAgIHRoaXMudGVtcGxhdGVUZXh0LnJlcGxhY2UoL1sgXFx0XSo8JV8vZ20sICc8JV8nKS5yZXBsYWNlKC9fJT5bIFxcdF0qL2dtLCAnXyU+Jyk7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIG1hdGNoZXMgPSB0aGlzLnBhcnNlVGVtcGxhdGVUZXh0KCk7XG4gICAgdmFyIGQgPSB0aGlzLm9wdHMuZGVsaW1pdGVyO1xuICAgIHZhciBvID0gdGhpcy5vcHRzLm9wZW5EZWxpbWl0ZXI7XG4gICAgdmFyIGMgPSB0aGlzLm9wdHMuY2xvc2VEZWxpbWl0ZXI7XG5cbiAgICBpZiAobWF0Y2hlcyAmJiBtYXRjaGVzLmxlbmd0aCkge1xuICAgICAgbWF0Y2hlcy5mb3JFYWNoKGZ1bmN0aW9uIChsaW5lLCBpbmRleCkge1xuICAgICAgICB2YXIgY2xvc2luZztcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBhbiBvcGVuaW5nIHRhZywgY2hlY2sgZm9yIGNsb3NpbmcgdGFnc1xuICAgICAgICAvLyBGSVhNRTogTWF5IGVuZCB1cCB3aXRoIHNvbWUgZmFsc2UgcG9zaXRpdmVzIGhlcmVcbiAgICAgICAgLy8gQmV0dGVyIHRvIHN0b3JlIG1vZGVzIGFzIGsvdiB3aXRoIG9wZW5EZWxpbWl0ZXIgKyBkZWxpbWl0ZXIgYXMga2V5XG4gICAgICAgIC8vIFRoZW4gdGhpcyBjYW4gc2ltcGx5IGNoZWNrIGFnYWluc3QgdGhlIG1hcFxuICAgICAgICBpZiAoIGxpbmUuaW5kZXhPZihvICsgZCkgPT09IDAgICAgICAgIC8vIElmIGl0IGlzIGEgdGFnXG4gICAgICAgICAgJiYgbGluZS5pbmRleE9mKG8gKyBkICsgZCkgIT09IDApIHsgLy8gYW5kIGlzIG5vdCBlc2NhcGVkXG4gICAgICAgICAgY2xvc2luZyA9IG1hdGNoZXNbaW5kZXggKyAyXTtcbiAgICAgICAgICBpZiAoIShjbG9zaW5nID09IGQgKyBjIHx8IGNsb3NpbmcgPT0gJy0nICsgZCArIGMgfHwgY2xvc2luZyA9PSAnXycgKyBkICsgYykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgbWF0Y2hpbmcgY2xvc2UgdGFnIGZvciBcIicgKyBsaW5lICsgJ1wiLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZWxmLnNjYW5MaW5lKGxpbmUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH0sXG5cbiAgcGFyc2VUZW1wbGF0ZVRleHQ6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3RyID0gdGhpcy50ZW1wbGF0ZVRleHQ7XG4gICAgdmFyIHBhdCA9IHRoaXMucmVnZXg7XG4gICAgdmFyIHJlc3VsdCA9IHBhdC5leGVjKHN0cik7XG4gICAgdmFyIGFyciA9IFtdO1xuICAgIHZhciBmaXJzdFBvcztcblxuICAgIHdoaWxlIChyZXN1bHQpIHtcbiAgICAgIGZpcnN0UG9zID0gcmVzdWx0LmluZGV4O1xuXG4gICAgICBpZiAoZmlyc3RQb3MgIT09IDApIHtcbiAgICAgICAgYXJyLnB1c2goc3RyLnN1YnN0cmluZygwLCBmaXJzdFBvcykpO1xuICAgICAgICBzdHIgPSBzdHIuc2xpY2UoZmlyc3RQb3MpO1xuICAgICAgfVxuXG4gICAgICBhcnIucHVzaChyZXN1bHRbMF0pO1xuICAgICAgc3RyID0gc3RyLnNsaWNlKHJlc3VsdFswXS5sZW5ndGgpO1xuICAgICAgcmVzdWx0ID0gcGF0LmV4ZWMoc3RyKTtcbiAgICB9XG5cbiAgICBpZiAoc3RyKSB7XG4gICAgICBhcnIucHVzaChzdHIpO1xuICAgIH1cblxuICAgIHJldHVybiBhcnI7XG4gIH0sXG5cbiAgX2FkZE91dHB1dDogZnVuY3Rpb24gKGxpbmUpIHtcbiAgICBpZiAodGhpcy50cnVuY2F0ZSkge1xuICAgICAgLy8gT25seSByZXBsYWNlIHNpbmdsZSBsZWFkaW5nIGxpbmVicmVhayBpbiB0aGUgbGluZSBhZnRlclxuICAgICAgLy8gLSU+IHRhZyAtLSB0aGlzIGlzIHRoZSBzaW5nbGUsIHRyYWlsaW5nIGxpbmVicmVha1xuICAgICAgLy8gYWZ0ZXIgdGhlIHRhZyB0aGF0IHRoZSB0cnVuY2F0aW9uIG1vZGUgcmVwbGFjZXNcbiAgICAgIC8vIEhhbmRsZSBXaW4gLyBVbml4IC8gb2xkIE1hYyBsaW5lYnJlYWtzIC0tIGRvIHRoZSBcXHJcXG5cbiAgICAgIC8vIGNvbWJvIGZpcnN0IGluIHRoZSByZWdleC1vclxuICAgICAgbGluZSA9IGxpbmUucmVwbGFjZSgvXig/OlxcclxcbnxcXHJ8XFxuKS8sICcnKTtcbiAgICAgIHRoaXMudHJ1bmNhdGUgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFsaW5lKSB7XG4gICAgICByZXR1cm4gbGluZTtcbiAgICB9XG5cbiAgICAvLyBQcmVzZXJ2ZSBsaXRlcmFsIHNsYXNoZXNcbiAgICBsaW5lID0gbGluZS5yZXBsYWNlKC9cXFxcL2csICdcXFxcXFxcXCcpO1xuXG4gICAgLy8gQ29udmVydCBsaW5lYnJlYWtzXG4gICAgbGluZSA9IGxpbmUucmVwbGFjZSgvXFxuL2csICdcXFxcbicpO1xuICAgIGxpbmUgPSBsaW5lLnJlcGxhY2UoL1xcci9nLCAnXFxcXHInKTtcblxuICAgIC8vIEVzY2FwZSBkb3VibGUtcXVvdGVzXG4gICAgLy8gLSB0aGlzIHdpbGwgYmUgdGhlIGRlbGltaXRlciBkdXJpbmcgZXhlY3V0aW9uXG4gICAgbGluZSA9IGxpbmUucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpO1xuICAgIHRoaXMuc291cmNlICs9ICcgICAgOyBfX2FwcGVuZChcIicgKyBsaW5lICsgJ1wiKScgKyAnXFxuJztcbiAgfSxcblxuICBzY2FuTGluZTogZnVuY3Rpb24gKGxpbmUpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGQgPSB0aGlzLm9wdHMuZGVsaW1pdGVyO1xuICAgIHZhciBvID0gdGhpcy5vcHRzLm9wZW5EZWxpbWl0ZXI7XG4gICAgdmFyIGMgPSB0aGlzLm9wdHMuY2xvc2VEZWxpbWl0ZXI7XG4gICAgdmFyIG5ld0xpbmVDb3VudCA9IDA7XG5cbiAgICBuZXdMaW5lQ291bnQgPSAobGluZS5zcGxpdCgnXFxuJykubGVuZ3RoIC0gMSk7XG5cbiAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICBjYXNlIG8gKyBkOlxuICAgIGNhc2UgbyArIGQgKyAnXyc6XG4gICAgICB0aGlzLm1vZGUgPSBUZW1wbGF0ZS5tb2Rlcy5FVkFMO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBvICsgZCArICc9JzpcbiAgICAgIHRoaXMubW9kZSA9IFRlbXBsYXRlLm1vZGVzLkVTQ0FQRUQ7XG4gICAgICBicmVhaztcbiAgICBjYXNlIG8gKyBkICsgJy0nOlxuICAgICAgdGhpcy5tb2RlID0gVGVtcGxhdGUubW9kZXMuUkFXO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBvICsgZCArICcjJzpcbiAgICAgIHRoaXMubW9kZSA9IFRlbXBsYXRlLm1vZGVzLkNPTU1FTlQ7XG4gICAgICBicmVhaztcbiAgICBjYXNlIG8gKyBkICsgZDpcbiAgICAgIHRoaXMubW9kZSA9IFRlbXBsYXRlLm1vZGVzLkxJVEVSQUw7XG4gICAgICB0aGlzLnNvdXJjZSArPSAnICAgIDsgX19hcHBlbmQoXCInICsgbGluZS5yZXBsYWNlKG8gKyBkICsgZCwgbyArIGQpICsgJ1wiKScgKyAnXFxuJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgZCArIGQgKyBjOlxuICAgICAgdGhpcy5tb2RlID0gVGVtcGxhdGUubW9kZXMuTElURVJBTDtcbiAgICAgIHRoaXMuc291cmNlICs9ICcgICAgOyBfX2FwcGVuZChcIicgKyBsaW5lLnJlcGxhY2UoZCArIGQgKyBjLCBkICsgYykgKyAnXCIpJyArICdcXG4nO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBkICsgYzpcbiAgICBjYXNlICctJyArIGQgKyBjOlxuICAgIGNhc2UgJ18nICsgZCArIGM6XG4gICAgICBpZiAodGhpcy5tb2RlID09IFRlbXBsYXRlLm1vZGVzLkxJVEVSQUwpIHtcbiAgICAgICAgdGhpcy5fYWRkT3V0cHV0KGxpbmUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm1vZGUgPSBudWxsO1xuICAgICAgdGhpcy50cnVuY2F0ZSA9IGxpbmUuaW5kZXhPZignLScpID09PSAwIHx8IGxpbmUuaW5kZXhPZignXycpID09PSAwO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIC8vIEluIHNjcmlwdCBtb2RlLCBkZXBlbmRzIG9uIHR5cGUgb2YgdGFnXG4gICAgICBpZiAodGhpcy5tb2RlKSB7XG4gICAgICAgIC8vIElmICcvLycgaXMgZm91bmQgd2l0aG91dCBhIGxpbmUgYnJlYWssIGFkZCBhIGxpbmUgYnJlYWsuXG4gICAgICAgIHN3aXRjaCAodGhpcy5tb2RlKSB7XG4gICAgICAgIGNhc2UgVGVtcGxhdGUubW9kZXMuRVZBTDpcbiAgICAgICAgY2FzZSBUZW1wbGF0ZS5tb2Rlcy5FU0NBUEVEOlxuICAgICAgICBjYXNlIFRlbXBsYXRlLm1vZGVzLlJBVzpcbiAgICAgICAgICBpZiAobGluZS5sYXN0SW5kZXhPZignLy8nKSA+IGxpbmUubGFzdEluZGV4T2YoJ1xcbicpKSB7XG4gICAgICAgICAgICBsaW5lICs9ICdcXG4nO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKHRoaXMubW9kZSkge1xuICAgICAgICAvLyBKdXN0IGV4ZWN1dGluZyBjb2RlXG4gICAgICAgIGNhc2UgVGVtcGxhdGUubW9kZXMuRVZBTDpcbiAgICAgICAgICB0aGlzLnNvdXJjZSArPSAnICAgIDsgJyArIGxpbmUgKyAnXFxuJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgICAvLyBFeGVjLCBlc2MsIGFuZCBvdXRwdXRcbiAgICAgICAgY2FzZSBUZW1wbGF0ZS5tb2Rlcy5FU0NBUEVEOlxuICAgICAgICAgIHRoaXMuc291cmNlICs9ICcgICAgOyBfX2FwcGVuZChlc2NhcGVGbignICsgc3RyaXBTZW1pKGxpbmUpICsgJykpJyArICdcXG4nO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIC8vIEV4ZWMgYW5kIG91dHB1dFxuICAgICAgICBjYXNlIFRlbXBsYXRlLm1vZGVzLlJBVzpcbiAgICAgICAgICB0aGlzLnNvdXJjZSArPSAnICAgIDsgX19hcHBlbmQoJyArIHN0cmlwU2VtaShsaW5lKSArICcpJyArICdcXG4nO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFRlbXBsYXRlLm1vZGVzLkNPTU1FTlQ6XG4gICAgICAgICAgLy8gRG8gbm90aGluZ1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIC8vIExpdGVyYWwgPCUlIG1vZGUsIGFwcGVuZCBhcyByYXcgb3V0cHV0XG4gICAgICAgIGNhc2UgVGVtcGxhdGUubW9kZXMuTElURVJBTDpcbiAgICAgICAgICB0aGlzLl9hZGRPdXRwdXQobGluZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIEluIHN0cmluZyBtb2RlLCBqdXN0IGFkZCB0aGUgb3V0cHV0XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5fYWRkT3V0cHV0KGxpbmUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzZWxmLm9wdHMuY29tcGlsZURlYnVnICYmIG5ld0xpbmVDb3VudCkge1xuICAgICAgdGhpcy5jdXJyZW50TGluZSArPSBuZXdMaW5lQ291bnQ7XG4gICAgICB0aGlzLnNvdXJjZSArPSAnICAgIDsgX19saW5lID0gJyArIHRoaXMuY3VycmVudExpbmUgKyAnXFxuJztcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogRXNjYXBlIGNoYXJhY3RlcnMgcmVzZXJ2ZWQgaW4gWE1MLlxuICpcbiAqIFRoaXMgaXMgc2ltcGx5IGFuIGV4cG9ydCBvZiB7QGxpbmsgbW9kdWxlOnV0aWxzLmVzY2FwZVhNTH0uXG4gKlxuICogSWYgYG1hcmt1cGAgaXMgYHVuZGVmaW5lZGAgb3IgYG51bGxgLCB0aGUgZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtYXJrdXAgSW5wdXQgc3RyaW5nXG4gKiBAcmV0dXJuIHtTdHJpbmd9IEVzY2FwZWQgc3RyaW5nXG4gKiBAcHVibGljXG4gKiBAZnVuY1xuICogKi9cbmV4cG9ydHMuZXNjYXBlWE1MID0gdXRpbHMuZXNjYXBlWE1MO1xuXG4vKipcbiAqIEV4cHJlc3MuanMgc3VwcG9ydC5cbiAqXG4gKiBUaGlzIGlzIGFuIGFsaWFzIGZvciB7QGxpbmsgbW9kdWxlOmVqcy5yZW5kZXJGaWxlfSwgaW4gb3JkZXIgdG8gc3VwcG9ydFxuICogRXhwcmVzcy5qcyBvdXQtb2YtdGhlLWJveC5cbiAqXG4gKiBAZnVuY1xuICovXG5cbmV4cG9ydHMuX19leHByZXNzID0gZXhwb3J0cy5yZW5kZXJGaWxlO1xuXG4vKipcbiAqIFZlcnNpb24gb2YgRUpTLlxuICpcbiAqIEByZWFkb25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLlZFUlNJT04gPSBfVkVSU0lPTl9TVFJJTkc7XG5cbi8qKlxuICogTmFtZSBmb3IgZGV0ZWN0aW9uIG9mIEVKUy5cbiAqXG4gKiBAcmVhZG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAcHVibGljXG4gKi9cblxuZXhwb3J0cy5uYW1lID0gX05BTUU7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuaWYgKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgd2luZG93LmVqcyA9IGV4cG9ydHM7XG59XG4iLCIvKlxuICogRUpTIEVtYmVkZGVkIEphdmFTY3JpcHQgdGVtcGxhdGVzXG4gKiBDb3B5cmlnaHQgMjExMiBNYXR0aGV3IEVlcm5pc3NlIChtZGVAZmxlZWdpeC5vcmcpXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4qL1xuXG4vKipcbiAqIFByaXZhdGUgdXRpbGl0eSBmdW5jdGlvbnNcbiAqIEBtb2R1bGUgdXRpbHNcbiAqIEBwcml2YXRlXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVnRXhwQ2hhcnMgPSAvW3xcXFxce30oKVtcXF1eJCsqPy5dL2c7XG5cbi8qKlxuICogRXNjYXBlIGNoYXJhY3RlcnMgcmVzZXJ2ZWQgaW4gcmVndWxhciBleHByZXNzaW9ucy5cbiAqXG4gKiBJZiBgc3RyaW5nYCBpcyBgdW5kZWZpbmVkYCBvciBgbnVsbGAsIHRoZSBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBJbnB1dCBzdHJpbmdcbiAqIEByZXR1cm4ge1N0cmluZ30gRXNjYXBlZCBzdHJpbmdcbiAqIEBzdGF0aWNcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydHMuZXNjYXBlUmVnRXhwQ2hhcnMgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoIXN0cmluZykge1xuICAgIHJldHVybiAnJztcbiAgfVxuICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZShyZWdFeHBDaGFycywgJ1xcXFwkJicpO1xufTtcblxudmFyIF9FTkNPREVfSFRNTF9SVUxFUyA9IHtcbiAgJyYnOiAnJmFtcDsnLFxuICAnPCc6ICcmbHQ7JyxcbiAgJz4nOiAnJmd0OycsXG4gICdcIic6ICcmIzM0OycsXG4gIFwiJ1wiOiAnJiMzOTsnXG59O1xudmFyIF9NQVRDSF9IVE1MID0gL1smPD4nXCJdL2c7XG5cbmZ1bmN0aW9uIGVuY29kZV9jaGFyKGMpIHtcbiAgcmV0dXJuIF9FTkNPREVfSFRNTF9SVUxFU1tjXSB8fCBjO1xufVxuXG4vKipcbiAqIFN0cmluZ2lmaWVkIHZlcnNpb24gb2YgY29uc3RhbnRzIHVzZWQgYnkge0BsaW5rIG1vZHVsZTp1dGlscy5lc2NhcGVYTUx9LlxuICpcbiAqIEl0IGlzIHVzZWQgaW4gdGhlIHByb2Nlc3Mgb2YgZ2VuZXJhdGluZyB7QGxpbmsgQ2xpZW50RnVuY3Rpb259cy5cbiAqXG4gKiBAcmVhZG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cblxudmFyIGVzY2FwZUZ1bmNTdHIgPVxuICAndmFyIF9FTkNPREVfSFRNTF9SVUxFUyA9IHtcXG4nXG4rICcgICAgICBcIiZcIjogXCImYW1wO1wiXFxuJ1xuKyAnICAgICwgXCI8XCI6IFwiJmx0O1wiXFxuJ1xuKyAnICAgICwgXCI+XCI6IFwiJmd0O1wiXFxuJ1xuKyAnICAgICwgXFwnXCJcXCc6IFwiJiMzNDtcIlxcbidcbisgJyAgICAsIFwiXFwnXCI6IFwiJiMzOTtcIlxcbidcbisgJyAgICB9XFxuJ1xuKyAnICAsIF9NQVRDSF9IVE1MID0gL1smPD5cXCdcIl0vZztcXG4nXG4rICdmdW5jdGlvbiBlbmNvZGVfY2hhcihjKSB7XFxuJ1xuKyAnICByZXR1cm4gX0VOQ09ERV9IVE1MX1JVTEVTW2NdIHx8IGM7XFxuJ1xuKyAnfTtcXG4nO1xuXG4vKipcbiAqIEVzY2FwZSBjaGFyYWN0ZXJzIHJlc2VydmVkIGluIFhNTC5cbiAqXG4gKiBJZiBgbWFya3VwYCBpcyBgdW5kZWZpbmVkYCBvciBgbnVsbGAsIHRoZSBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWQuXG4gKlxuICogQGltcGxlbWVudHMge0VzY2FwZUNhbGxiYWNrfVxuICogQHBhcmFtIHtTdHJpbmd9IG1hcmt1cCBJbnB1dCBzdHJpbmdcbiAqIEByZXR1cm4ge1N0cmluZ30gRXNjYXBlZCBzdHJpbmdcbiAqIEBzdGF0aWNcbiAqIEBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5lc2NhcGVYTUwgPSBmdW5jdGlvbiAobWFya3VwKSB7XG4gIHJldHVybiBtYXJrdXAgPT0gdW5kZWZpbmVkXG4gICAgPyAnJ1xuICAgIDogU3RyaW5nKG1hcmt1cClcbiAgICAgIC5yZXBsYWNlKF9NQVRDSF9IVE1MLCBlbmNvZGVfY2hhcik7XG59O1xuZXhwb3J0cy5lc2NhcGVYTUwudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGlzKSArICc7XFxuJyArIGVzY2FwZUZ1bmNTdHI7XG59O1xuXG4vKipcbiAqIE5haXZlIGNvcHkgb2YgcHJvcGVydGllcyBmcm9tIG9uZSBvYmplY3QgdG8gYW5vdGhlci5cbiAqIERvZXMgbm90IHJlY3Vyc2UgaW50byBub24tc2NhbGFyIHByb3BlcnRpZXNcbiAqIERvZXMgbm90IGNoZWNrIHRvIHNlZSBpZiB0aGUgcHJvcGVydHkgaGFzIGEgdmFsdWUgYmVmb3JlIGNvcHlpbmdcbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IHRvICAgRGVzdGluYXRpb24gb2JqZWN0XG4gKiBAcGFyYW0gIHtPYmplY3R9IGZyb20gU291cmNlIG9iamVjdFxuICogQHJldHVybiB7T2JqZWN0fSAgICAgIERlc3RpbmF0aW9uIG9iamVjdFxuICogQHN0YXRpY1xuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0cy5zaGFsbG93Q29weSA9IGZ1bmN0aW9uICh0bywgZnJvbSkge1xuICBmcm9tID0gZnJvbSB8fCB7fTtcbiAgZm9yICh2YXIgcCBpbiBmcm9tKSB7XG4gICAgdG9bcF0gPSBmcm9tW3BdO1xuICB9XG4gIHJldHVybiB0bztcbn07XG5cbi8qKlxuICogTmFpdmUgY29weSBvZiBhIGxpc3Qgb2Yga2V5IG5hbWVzLCBmcm9tIG9uZSBvYmplY3QgdG8gYW5vdGhlci5cbiAqIE9ubHkgY29waWVzIHByb3BlcnR5IGlmIGl0IGlzIGFjdHVhbGx5IGRlZmluZWRcbiAqIERvZXMgbm90IHJlY3Vyc2UgaW50byBub24tc2NhbGFyIHByb3BlcnRpZXNcbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IHRvICAgRGVzdGluYXRpb24gb2JqZWN0XG4gKiBAcGFyYW0gIHtPYmplY3R9IGZyb20gU291cmNlIG9iamVjdFxuICogQHBhcmFtICB7QXJyYXl9IGxpc3QgTGlzdCBvZiBwcm9wZXJ0aWVzIHRvIGNvcHlcbiAqIEByZXR1cm4ge09iamVjdH0gICAgICBEZXN0aW5hdGlvbiBvYmplY3RcbiAqIEBzdGF0aWNcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydHMuc2hhbGxvd0NvcHlGcm9tTGlzdCA9IGZ1bmN0aW9uICh0bywgZnJvbSwgbGlzdCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgcCA9IGxpc3RbaV07XG4gICAgaWYgKHR5cGVvZiBmcm9tW3BdICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICB0b1twXSA9IGZyb21bcF07XG4gICAgfVxuICB9XG4gIHJldHVybiB0bztcbn07XG5cbi8qKlxuICogU2ltcGxlIGluLXByb2Nlc3MgY2FjaGUgaW1wbGVtZW50YXRpb24uIERvZXMgbm90IGltcGxlbWVudCBsaW1pdHMgb2YgYW55XG4gKiBzb3J0LlxuICpcbiAqIEBpbXBsZW1lbnRzIHtDYWNoZX1cbiAqIEBzdGF0aWNcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydHMuY2FjaGUgPSB7XG4gIF9kYXRhOiB7fSxcbiAgc2V0OiBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcbiAgICB0aGlzLl9kYXRhW2tleV0gPSB2YWw7XG4gIH0sXG4gIGdldDogZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhW2tleV07XG4gIH0sXG4gIHJlbW92ZTogZnVuY3Rpb24gKGtleSkge1xuICAgIGRlbGV0ZSB0aGlzLl9kYXRhW2tleV07XG4gIH0sXG4gIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fZGF0YSA9IHt9O1xuICB9XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgaHlwaGVuIGNhc2UgdmFyaWFibGUgaW50byBjYW1lbCBjYXNlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgSHlwaGVuIGNhc2Ugc3RyaW5nXG4gKiBAcmV0dXJuIHtTdHJpbmd9IENhbWVsIGNhc2Ugc3RyaW5nXG4gKiBAc3RhdGljXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnRzLmh5cGhlblRvQ2FtZWwgPSBmdW5jdGlvbiAoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvLVthLXpdL2csIGZ1bmN0aW9uIChtYXRjaCkgeyByZXR1cm4gbWF0Y2hbMV0udG9VcHBlckNhc2UoKTsgfSk7XG59O1xuIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9